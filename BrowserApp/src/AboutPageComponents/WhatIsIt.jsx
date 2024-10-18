import Comp from '../assetModules/svgs/comp'
import BgBlocks from './bgBlocks'

const WhatIsIt = () => {
  return (
    <section
    id="WhatIsIt"
   
    >
      <BgBlocks ff={480} num={12} delay={0} text={"ToNote is a productivity app designed to help users stay organized and efficient. \n\nIt offers tools for managing notes, diaries, tables, checklists, and to-do lists, making it easier to track progress and stay on top organized"}>
        
         
      </BgBlocks>
      <BgBlocks
      delay={500}
        num={8}
        text={"Desktop, and mobile versions are comming soon"}
      >
        <div id='compil'>
          <Comp />
        </div>
      </BgBlocks>


      
    </section>

  )
}

export default WhatIsIt





