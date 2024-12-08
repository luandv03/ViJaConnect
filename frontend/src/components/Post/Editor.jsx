import { useCallback, useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "../ui/Button";
import EditorJS from "@editorjs/editorjs";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "../ui/Select";

const Editor = ({ closeModal }) => {
  const editorRef = useRef(null);
  const titleInputRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const topicItems = [
    { id: 1, title: "文化交流: ベトナムと日本の文化を学ぶ" },
    { id: 2, title: "日越料理体験: 食で繋がる" },
    { id: 3, title: "日本語とベトナム語の学び合い" },
    { id: 4, title: "留学生のリアルな体験談" },
    { id: 5, title: "日越ビジネスの架け橋" },
    { id: 6, title: "日越共同プロジェクトの成功事例" },
  ];

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
                  // Mock uploader response
                  return {
                    success: 1,
                    file: { url: URL.createObjectURL(file) },
                  };
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

  if (!isMounted) return null;

  return (
    <div className="w-full p-4 bg-zinc-50 rounded-lg border border-zinc-200">
      <div className="prose prose-stone dark:prose-invert">
        <TextareaAutosize
          ref={titleInputRef}
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
              {topicItems.map((topic) => (
                <SelectItem key={topic.id} value={topic.title}>
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
          form="subreddit-post-form"
          onClick={closeModal}
        >
          キャンセル
        </Button>
        <Button type="submit" className="w-full" form="subreddit-post-form">
          ポスト
        </Button>
      </div>
    </div>
  );
};

export default Editor;
