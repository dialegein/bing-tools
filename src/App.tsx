import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "./components/ui/textarea";
import { useToast } from "./components/ui/use-toast";
import { useCopyToClipboard } from "./components/ui/use-copy";

function App() {
  const { toast } = useToast();
  const [copiedText, copy] = useCopyToClipboard();
  const [url, setUrl] = useState("");
  const params = useMemo(() => {
    try {
      const result: [string, string][] = [];
      const _url = new URL(url);
      for (const [key, value] of _url.searchParams.entries()) {
        result.push([key, value]);
      }
      return result;
    } catch (e) {
      console.error(e);
      return [];
    }
  }, [url]);

  return (
    <div className="p-5">
      <div className="relative">
        <Textarea
          className=" h-[30vh] text-base"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button
          className=" absolute bottom-0 right-0"
          onClick={() => {
            copy(url).then(() => {
              console.log(copiedText);
              toast({
                description: "复制成功",
              });
            });
          }}
        >
          复制
        </Button>
      </div>

      {url !== "" && (
        <ul className=" space-y-3 mt-5">
          {params.map((p, i) => {
            return (
              <li key={i} className="flex justify-between">
                <span>
                  {p[0]} : {p[1]}
                </span>
                <Button
                  onClick={() => {
                    try {
                      const _url = url.split("?")?.[0];
                      console.log(_url);
                      const newUrl = new URL(_url);
                      params.forEach((p, ii) => {
                        if (ii === i) {
                          return;
                        }
                        newUrl.searchParams.set(p[0], p[1]);
                      });
                      setUrl(newUrl.toString());
                      console.log(newUrl.toString());
                    } catch (e) {
                      console.error(e);
                    }
                  }}
                >
                  X
                </Button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default App;
