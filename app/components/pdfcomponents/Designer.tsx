import { useEffect, useRef } from "react";
import { Designer, Template } from "@pdfme/ui";
import { generate } from "@pdfme/generator";
import {
  getTemplate,
  readFile,
  cloneDeep,
  getTemplateFromJsonFile,
  downloadJsonFile,
} from "./helper";
import { useLocation, Link } from "@remix-run/react";
import {
  BsFillFileArrowDownFill,
  BsSdCardFill,
  BsReplyAll,
  BsFileEarmarkPdfFill
} from "react-icons/bs";
import classNames from "classnames";
import { FcCloth } from "react-icons/fc";
import { HiOutlineLogout, HiNewspaper } from 'react-icons/hi'
import { DASHBOARD_SIDEBAR_LINKS, DASHBOARD_SIDEBAR_BOTTOM_LINKS, DASHBOARD_DOCS_LINKS, DASHBOARD_DOCS_FUNCTIONS } from "../lib/navigation";

const linkClasses = 'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'
const docClasses = 'items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'
const docFClasses = 'items-center gap-2 font-light px-3 py-2 hover:bg-neutral-800 hover:no-underline active:bg-neutral-600 rounded-sm text-base'



function DocsDesign() {
  const designerRef = useRef<HTMLDivElement | null>(null);
  const designer = useRef<Designer | null>(null);

  useEffect(() => {
    if (designerRef.current) {
      let template: Template = {
        basePdf: "data:application/pdf;base64,JVBERi0xLjcKJeLjz9MKNSAwIG9iago8PAovRmlsdGVyIC9GbGF0ZURlY29kZQovTGVuZ3RoIDM4Cj4+CnN0cmVhbQp4nCvkMlAwUDC1NNUzMVGwMDHUszRSKErlCtfiyuMK5AIAXQ8GCgplbmRzdHJlYW0KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL01lZGlhQm94IFswIDAgNTk1LjQ0IDg0MS45Ml0KL1Jlc291cmNlcyA8PAo+PgovQ29udGVudHMgNSAwIFIKL1BhcmVudCAyIDAgUgo+PgplbmRvYmoKMiAwIG9iago8PAovVHlwZSAvUGFnZXMKL0tpZHMgWzQgMCBSXQovQ291bnQgMQo+PgplbmRvYmoKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjMgMCBvYmoKPDwKL3RyYXBwZWQgKGZhbHNlKQovQ3JlYXRvciAoU2VyaWYgQWZmaW5pdHkgRGVzaWduZXIgMS4xMC40KQovVGl0bGUgKFVudGl0bGVkLnBkZikKL0NyZWF0aW9uRGF0ZSAoRDoyMDIyMDEwNjE0MDg1OCswOScwMCcpCi9Qcm9kdWNlciAoaUxvdmVQREYpCi9Nb2REYXRlIChEOjIwMjIwMTA2MDUwOTA5WikKPj4KZW5kb2JqCjYgMCBvYmoKPDwKL1NpemUgNwovUm9vdCAxIDAgUgovSW5mbyAzIDAgUgovSUQgWzwyODhCM0VENTAyOEU0MDcyNERBNzNCOUE0Nzk4OUEwQT4gPEY1RkJGNjg4NkVERDZBQUNBNDRCNEZDRjBBRDUxRDlDPl0KL1R5cGUgL1hSZWYKL1cgWzEgMiAyXQovRmlsdGVyIC9GbGF0ZURlY29kZQovSW5kZXggWzAgN10KL0xlbmd0aCAzNgo+PgpzdHJlYW0KeJxjYGD4/5+RUZmBgZHhFZBgDAGxakAEP5BgEmFgAABlRwQJCmVuZHN0cmVhbQplbmRvYmoKc3RhcnR4cmVmCjUzMgolJUVPRgo=",
        schemas: [],
      };

      designer.current = new Designer({
        domContainer: designerRef.current,
        template,
      });
      designer.current.onSaveTemplate(onSaveTemplate);
    }
    return () => {
      if (designer.current) {
        designer.current.destroy();
      }
    };
  }, [designerRef]);

  const onChangeBasePDF = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files) {
      readFile(e.target.files[0], "dataURL").then(async (basePdf) => {
        if (designer.current) {
          designer.current.updateTemplate(
            Object.assign(cloneDeep(designer.current.getTemplate()), {
              basePdf,
            })
          );
        }
      });
    }
  };

  const onLoadTemplate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files) {
      getTemplateFromJsonFile(e.target.files[0])
        .then((t) => {
          if (designer.current) {
            designer.current.updateTemplate(t);
          }
        })
        .catch((e) => {
          alert(`Invalid template file.
--------------------------
${e}`);
        });
    }
  };

  const onDownloadTemplate = () => {
    if (designer.current) {
      downloadJsonFile(designer.current.getTemplate(), "template");
    }
  };

  const onSaveTemplate = (template?: Template) => {
    if (designer.current) {
      localStorage.setItem(
        "template",
        JSON.stringify(template || designer.current.getTemplate())
      );
      alert("Template Salvo!");
    }
  };

  const onResetTemplate = () => {
    if (designer.current) {
      designer.current.updateTemplate(getTemplate());
      localStorage.removeItem("template");
    }
  };

 const onGeneratePDF = async () => {
    if (designer.current) {
      const template = designer.current.getTemplate();
      const inputs = template.sampledata ?? [];
      const pdf = await generate({ template, inputs });
      const blob = new Blob([pdf.buffer], { type: "application/pdf" });
      window.open(URL.createObjectURL(blob));
    }
  };

  return (
    <div className="flex h-screen">
         <div className="flex flex-col bg-neutral-900 w-60 p-3 text-white min-w-[216px]">
            <div className="flex items-center gap-2 py-3">
                <Link to={"/"} className="flex items-center gap-2">
                <FcCloth fontSize={24}/>
                <span className="text-neutral-180 text-lg font-bold">Me<span className="text-orange-400">Docs</span></span>
                </Link>
            </div>
            <div className="flex-1 py-8 flex flex-col gap-0">
                {DASHBOARD_SIDEBAR_LINKS.map((item, index) => {
                    return(
                        <div key={index}>
                            <SidebarLinks key={index} item={item}></SidebarLinks>
                        </div>
                    )
                })}
                {DASHBOARD_DOCS_LINKS.map((item, index) => {
                    return(
                        <div key={index}>
                            <DocsbarLinks key={index} item={item}></DocsbarLinks>
                        </div>
                    )
                })}
                   <button onClick={onDownloadTemplate} className={classNames("flex ml-3 mt-1",docFClasses)}>
                      <span className="text-xl"><BsFillFileArrowDownFill/></span>
                        Baixar Template
                   </button>
                   <button onClick={() => onSaveTemplate()} className={classNames("flex ml-3 mt-1",docFClasses)}>
                      <span className="text-xl"><BsSdCardFill/></span>
                        Salvar Template
                   </button>
                   <button onClick={onResetTemplate} className={classNames("flex ml-3 mt-1",docFClasses)}>
                      <span className="text-xl"><BsReplyAll/></span>
                        Resetar Template
                   </button>
                   <button onClick={onGeneratePDF} className={classNames("flex ml-3 mt-1",docFClasses)}>
                      <span className="text-xl"><BsFileEarmarkPdfFill/></span>
                        Baixar PDF
                   </button>
            </div>
            <div>
                {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item, index) => {
                    return(
                        <div key={index}>
                            <SidebarLinks key={index} item={item}></SidebarLinks>
                        </div>
                    )
                })}
                <form method="post" action="/logout">
                    <button type="submit" className={classNames(linkClasses, "text-neutral-400 cursor-pointer w-full")}>
                        <HiOutlineLogout fontSize={24}/>
                        Sair
                    </button>
                </form>
            </div>
        </div>
      <div className=" relative w-[90%]" ref={designerRef} />
    </div>
  );
}

export default DocsDesign;


function SidebarLinks({ item }: any){

  const {pathname} = useLocation()

  return(
      <Link to={`../${item.path}`} className={classNames(pathname === item.path ? 'bg-neutral-700 text-white' : "text-neutral-400" , 'text-white',linkClasses)}>
          <span className="text-xl">{item.icon}</span>
          {item.label}
      </Link>
  )
}

function DocsbarLinks({ item }: any){

  const {pathname} = useLocation()

  return(
      <Link to={`../${item.path}`} className={classNames(pathname === item.path ? 'bg-neutral-700 text-white flex' : "text-neutral-400 hidden" , 'text-white',docClasses)}>
          <span className="text-xl">{item.icon}</span>
          {item.label}
      </Link>
  )
}

function DocsFunctions({ item }: any){

  const {pathname} = useLocation()

  return(
      <button onClick={item.function} className={classNames(pathname === item.path ? 'ml-3 text-white flex' : "text-neutral-400 hidden" , 'text-white',docFClasses)}>
          <span className="text-xl">{item.icon}</span>
          {item.label}
      </button>
  )
}
