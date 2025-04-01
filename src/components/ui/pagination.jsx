import Link from "next/link";

  export default function PageNavigator({
    correntPage, 
    sizePages,
    title = null
  }){
    
  const querytitle = title ? `title=${title}&` : ''
  const size = Array.from({ length: sizePages }, (_, i) => i + 1);
  return(
    <nav className="flex items-center gap-3 px-5 py-2 bg-white border border-laranjaProdunfo rounded-full">
      <button>
         Voltar  
      </button>
      {
        size.map((item,index) => {
          return (
          <Link key={index}
           href={`?${querytitle}page=${index}`}
            className={`${index == correntPage? "w-8 h-8 flex items-center justify-center rounded-lg bg-laranjaProdunfo text-white" : null}`}>
              {index+1}
            </Link>          )
        })
      }

      <button>
        Próximo
      </button>
    </nav>
  )
}