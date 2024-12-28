import { useCallback, useEffect, useRef, useState, useContext } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

import { Button } from "../ui/Button";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
    SelectGroup,
    SelectLabel,
} from "../ui/Select";
import { topicService } from "../../services/topic.service";
import { createPost as createPostService } from "../../services/post.service";
import { AuthContext } from "../../providers/AuthProvider";
import { uploadImage } from "../../services/upload.service.js";

const PostValidator = z.object({
    title: z.string().min(1, "Title is required"),
    author_id: z.string().min(1, "Author ID is required"),
    topic_id: z.any(),
    image_link: z.any().nullable(), // Image link can be null
    desc: z.any(),
});

// eslint-disable-next-line react/prop-types
const Editor = ({ setPostItem, closeModal }) => {
    const editorRef = useRef(null);
    const titleInputRef = useRef(null);
    const [isMounted, setIsMounted] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [topics, setTopics] = useState([]);
    const { profile } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const topicsData = await topicService.fetchTopics();
                setTopics(topicsData.data);
            } catch (error) {
                console.error("Failed to fetch topics", error);
            }
        };
        fetchData();
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(PostValidator),
        defaultValues: {
            title: "",
            author_id: profile._id,
            topic_id: "",
            image_link: null,
            desc: "",
        },
    });

    const { mutate: createPost } = useMutation({
        mutationFn: async ({
            title,
            author_id,
            topic_id,
            image_link,
            desc,
        }) => {
            const payload = { title, author_id, topic_id, image_link, desc };
            return await createPostService(payload);
        },
        onError: () => {
            return toast("ポストの作成に失敗しました。", { icon: "error" });
        },
        onSuccess: (res) => {
            console.log("Post created:", res);
            if (res.status === 201) {
                setPostItem((prev) => [res.data, ...prev]);
            }
            closeModal();
            return toast("ポストが作成されました。", { icon: "success" });
        },
    });

    const initializeEditor = useCallback(async () => {
        const EditorJS = (await import("@editorjs/editorjs")).default;
        const Header = (await import("@editorjs/header")).default;
        const Embed = (await import("@editorjs/embed")).default;
        const Table = (await import("@editorjs/table")).default;
        const List = (await import("@editorjs/list")).default;
        const Code = (await import("@editorjs/code")).default;
        const LinkTool = (await import("@editorjs/link")).default;
        const InlineCode = (await import("@editorjs/inline-code")).default;
        const ImageTool = (await import("@editorjs/image")).default;

        if (!editorRef.current) {
            const editor = new EditorJS({
                holder: "editor",
                onReady() {
                    editorRef.current = editor;
                },
                placeholder: "ここに入力してください...",
                inlineToolbar: true,
                tools: {
                    header: Header,
                    linkTool: {
                        class: LinkTool,
                        config: { endpoint: "/api/link" },
                    },
                    image: {
                        class: ImageTool,
                        config: {
                            uploader: {
                                async uploadByFile(file) {
                                    try {
                                        const response = await uploadImage(
                                            file
                                        );
                                        return {
                                            success: 1,
                                            file: { url: response.data.url },
                                        };
                                    } catch (error) {
                                        console.error("Upload failed:", error);
                                        return {
                                            success: 0,
                                            error: error.message,
                                        };
                                    }
                                },
                            },
                        },
                    },
                    list: List,
                    code: Code,
                    inlineCode: InlineCode,
                    table: Table,
                    embed: Embed,
                },
            });
        }
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setIsMounted(true);
        }
    }, []);

    useEffect(() => {
        const init = async () => {
            await initializeEditor();
            setTimeout(() => {
                titleInputRef.current?.focus();
                console.log("Title input ref:", titleInputRef.current);
            }, 0);
        };

        if (isMounted) {
            init();
            return () => {
                editorRef.current?.destroy();
                editorRef.current = undefined;
            };
        }
    }, [isMounted, initializeEditor]);

    const onSubmit = async (data) => {
        console.log("onSubmit called");
        console.log("Form data:", data);

        const blocks = await editorRef.current?.save();

        const payload = {
            title: data.title, // Post title
            author_id: profile._id, // Author's ID from the context
            topic_id: selectedTopic, // Topic IDs (selected topic)
            image_link:
                blocks?.blocks?.find((block) => block.type === "image")?.data
                    ?.file?.url || null, // Extract the first image URL if available
            desc:
                blocks?.blocks?.find((block) => block.type === "paragraph")
                    ?.data?.text || "", // Extract a paragraph as description
        };

        console.log("Payload:", payload);
        createPost(payload);
    };

    useEffect(() => {
        console.log("Validation errors:", errors); // Log validation errors
    }, [errors]);

    if (!isMounted) return null;

    const { ref: titleRef, ...rest } = register("title");

    return (
        <div className="w-full p-4 bg-zinc-50 rounded-lg border border-zinc-200">
            <form
                id="post-form"
                className="w-full"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="prose prose-stone dark:prose-invert">
                    <TextareaAutosize
                        ref={(e) => {
                            titleRef(e);
                            titleInputRef.current = e;
                        }}
                        {...rest}
                        placeholder="タイトル"
                        className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
                    />
                    <Select onValueChange={setSelectedTopic}>
                        <SelectTrigger className="mb-4">
                            <SelectValue placeholder="トピックを選択" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>トピック</SelectLabel>
                                {topics.length > 0 &&
                                    topics?.map((topic) => (
                                        <SelectItem
                                            key={topic._id}
                                            value={topic._id}
                                        >
                                            {topic.title}
                                        </SelectItem>
                                    ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <div id="editor" className="min-h-[500px]" />
                </div>
                <div className="w-full flex justify-between gap-4 mt-4">
                    <Button
                        type="button"
                        className="w-full"
                        variant="destructive"
                        onClick={closeModal}
                    >
                        キャンセル
                    </Button>
                    <Button type="submit" className="w-full">
                        ポスト
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Editor;
