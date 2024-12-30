"use client";

import { useState } from "react";
import metaOG from "./action";

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [err, setErr] = useState<any>(null);
  const load = async (url: string) => {
    setLoading(true);
    setData(null);
    setErr(null);
    return await metaOG(url)
      .then(setData)
      .catch(setErr)
      .finally(() => setLoading(false));
  };
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const url = formData.get("url") as string;
          load(url);
        }}
        className={`flex ring-1 ${err ? "ring-red-500" : ""}  ${
          data ? "ring-green-500" : ""
        }`}
      >
        <input
          name="url"
          className="flex-1 border-none outline-none p-2 px-3 "
          placeholder="http..."
        />
        <button
          type="submit"
          className="p-2 px-3 bg-slate-500 border-none outline-none"
        >
          Load
        </button>
      </form>
      {loading && <div className="p-4"> loading...</div>}
      {data && !err && (
        <>
          <div className={`flex py-4 gap-4`}>
            {data?.["og:image"] && (
              <img src={data?.["og:image"]} className="h-32" />
            )}
            <div>
              <h1 className="text-lg">{data.title}</h1>
              <div className="opacity-70">{data.description}</div>
              <div className="opacity-40 text-sm">{data["og:url"]}</div>
            </div>
          </div>
          <pre
            className={`whitespace-pre-wrap break-words max-w-full overflow-x-auto p-4 `}
          >
            {JSON.stringify(data, null, 2)}
          </pre>
        </>
      )}
      {err && (
        <pre
          className={`whitespace-pre-wrap break-words max-w-full overflow-x-auto text-red-500`}
        >
          {JSON.stringify(err, null, 2)}
        </pre>
      )}
    </div>
  );
}
