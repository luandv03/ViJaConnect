import { useCallback, useEffect, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { Button } from './ui/Button';
import EditorJS from '@editorjs/editorjs';

const Editor = () => {
  const editorRef = useRef(null);
  const titleInputRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import('@editorjs/editorjs')).default;
    const Header = (await import('@editorjs/header')).default;
    const Embed = (await import('@editorjs/embed')).default;
    const Table = (await import('@editorjs/table')).default;
    const List = (await import('@editorjs/list')).default;
    const Code = (await import('@editorjs/code')).default;
    const LinkTool = (await import('@editorjs/link')).default;
    const InlineCode = (await import('@editorjs/inline-code')).default;
    const ImageTool = (await import('@editorjs/image')).default;

    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: 'editor',
        onReady() {
          editorRef.current = editor;
        },
        placeholder: 'Type here to write your post...',
        inlineToolbar: true,
        tools: {
          header: Header,
          linkTool: {
            class: LinkTool,
            config: { endpoint: '/api/link' },
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
    if (typeof window !== 'undefined') {
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
          placeholder="Title"
          className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
        />
        <div id="editor" className="min-h-[500px]" />
        <p className="text-sm text-gray-500">
          Use{' '}
          <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
            Tab
          </kbd>{' '}
          to open the command menu.
        </p>
      </div>
      <div className='w-full flex justify-between gap-4 mt-4'>
        <Button type='submit' className='w-full' variant='destructive' form='subreddit-post-form'>
          Cancel
        </Button>
        <Button type='submit' className='w-full' form='subreddit-post-form'>
          Post
        </Button>
      </div>
    </div>
  );
};

export default Editor;
