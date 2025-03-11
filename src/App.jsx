import React, { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'
import { main } from './aiLogic'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Landing from './Landing';

const App = () => {
  const [file, setFile] = useState(null)
  const [fileContent,setFileContent]=useState('')
  const [generatedText, setGeneratedText] = useState([])
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isFolder,setIsFolder]=useState(false)
    

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    setFile(droppedFile)
    const reader = new FileReader();
    reader.onload = (event) => {
      console.log(event.target.result);
      setFileContent(event.target.result)
    };
    reader.readAsText(droppedFile);
  }
  const handleFileChange = async(e) => {
    const selectedFile =  e.target.files;
    let  temp=''
    let removesFileCount=0
    const fileContents =[];
    const ignores=[]
          if(selectedFile.length===1 && !isFolder){
            const read=new FileReader()
            read.onload=(e)=>{
              setFileContent(e.target.result)
            }
            read.readAsText(selectedFile[0])
            return 
          }
  
  try{
    for(let file of selectedFile){
      const read=new FileReader()
      if(file.webkitRelativePath.includes('node_modules') || file.webkitRelativePath.includes('.git')){
        removesFileCount++;
        
      }
      read.onload=(e)=>{
        if(file.name==='.gitignore')
        {
        const strs=e.target.result
        for (let str of strs){
          temp+=str;
          if(str==='\n'){
            if(!temp.startsWith('#') && temp.trim() !== '') {
              ignores.push(temp.trim())
            }
            temp=''
          }
        }
        // Handle last line if it doesn't end with newline
        if(temp && !temp.startsWith('#') && temp.trim() !== '') {
          ignores.push(temp.trim())
        }
        }
      }
      read.readAsText(file)
    }
  }finally{
    console.log(ignores);
    
  }

  try{
    for(let f of selectedFile){
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileObj={
          name:JSON.stringify(f.name),
          content:JSON.stringify(e.target.result)
        }
        const shouldIgnore = ignores.some(ignore => 
          f.webkitRelativePath.includes(ignore) || f.name.includes(ignore)
        );
        if(!f.webkitRelativePath.includes('node_modules') && !shouldIgnore && !f.webkitRelativePath.includes('.git'))
        {          
          fileContents.push(fileObj) 
          //console.log(fileContents);
          
        }

        console.log(fileContents.length,selectedFile.length-removesFileCount-1);
        if(fileContents.length === selectedFile.length-removesFileCount-1) {  

          let arrToString=fileContents.map((value)=>{ return value.content})
          console.log(arrToString.join("\n").toString())
          console.log(arrToString);
                  
          setFile(arrToString);
          setFileContent(arrToString.join(" "));
        }
        
      };
      reader.readAsText(f);
    }       
  }finally{
  
    
  }  
     
}

  const handleUpload = async () => {
    console.log(fileContent,file);

   console.log(file);
    
    
    if (fileContent) {
      setIsLoading(true)
      console.log(fileContent);
   
      
      try {
        const res=await main(fileContent)
      
        setGeneratedText(prev=>[...prev,res])
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleDownload = () => {
    const content = generatedText.join('\n\n');
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'documentation.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    window.localStorage.setItem('theme',isDarkMode)
  }
  useEffect(()=>{
    const isTheme=window.localStorage.getItem('theme')
    console.log(isTheme);
    
    setIsDarkMode(isTheme)

  },[])

  const styles = {
    container: `min-h-screen ${isDarkMode ? 'bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900' : 'bg-gradient-to-r from-rose-100 to-teal-100'} py-12 transition-colors duration-200 relative z-20`,
    mainWrapper: `flex flex-col-reverse lg:flex-row-reverse gap-8 ${isDarkMode ? 'bg-slate-800/30' : 'bg-white/30'} rounded-3xl shadow-2xl p-6 lg:p-10 backdrop-blur-lg border ${isDarkMode ? 'border-slate-700' : 'border-white/20'}`,
    
    title: `text-3xl lg:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'} mb-2`,
    subtitle: `${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-sm lg:text-base`,
    themeButton: `p-3 rounded-2xl ${isDarkMode ? 'bg-slate-700 text-yellow-300 hover:bg-slate-600' : 'bg-white text-slate-700 hover:bg-slate-50'} transition-all duration-300 shadow-lg`,
    iconContainer: `w-12 h-12 rounded-2xl flex items-center justify-center ${isDarkMode ? 'bg-purple-500/20' : 'bg-purple-100'}`,
    icon: `h-6 w-6 ${isDarkMode ? 'text-purple-300' : 'text-purple-600'}`,
    sectionTitle: `text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`,
    dropZone: `border-3 border-dashed rounded-2xl p-6 lg:p-10 text-center transition-all duration-300 ${
      isDragging
        ? 'border-purple-500 bg-purple-50/10'
        : isDarkMode
        ? 'border-slate-600 hover:border-purple-500/50 bg-slate-800/30'
        : 'border-slate-200 hover:border-purple-300 bg-white/50'
    }`,
    uploadIcon: `w-16 h-16 mx-auto rounded-full flex items-center justify-center ${isDarkMode ? 'bg-slate-700' : 'bg-purple-50'}`,
    uploadIconSvg: `h-8 w-8 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`,
    dropText: `text-lg font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`,
    fileInput: `block w-full text-sm mt-2 ${isDarkMode ? 'text-slate-300 file:bg-purple-600 file:text-white' : 'text-slate-700 file:bg-purple-600 file:text-white'}
      file:mr-4 file:py-2.5 file:px-6
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      hover:file:bg-purple-700
      cursor-pointer transition-all duration-300`,
    selectedFile: `mt-4 p-4 rounded-xl ${isDarkMode ? 'bg-slate-700/50' : 'bg-purple-50'}`,
    selectedFileName: `font-medium ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`,
    generateButton: `${isDarkMode ? 'bg-purple-600 hover:bg-purple-500' : 'bg-purple-600 hover:bg-purple-700'} text-white px-8 py-3 rounded-xl
      font-semibold transition-all duration-300
      hover:shadow-lg hover:shadow-purple-500/20 focus:outline-none focus:ring-2 
      focus:ring-purple-500 focus:ring-offset-2 flex items-center gap-2 w-full justify-center
      ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`,
    downloadButton: `${isDarkMode ? 'bg-teal-600 hover:bg-teal-500' : 'bg-teal-600 hover:bg-teal-700'} text-white px-8 py-3 rounded-xl
      font-semibold transition-all duration-300 mt-4
      hover:shadow-lg hover:shadow-teal-500/20 focus:outline-none focus:ring-2 
      focus:ring-teal-500 focus:ring-offset-2 flex items-center gap-2 w-full justify-center`,
    docIconContainer: `w-12 h-12 rounded-2xl flex items-center justify-center ${isDarkMode ? 'bg-teal-500/20' : 'bg-teal-100'}`,
    docIcon: `h-6 w-6 ${isDarkMode ? 'text-teal-300' : 'text-teal-600'}`,
    docContent: `w-full min-h-[calc(100vh-300px)] max-h-screen overflow-auto ${isDarkMode ? 'bg-slate-800/50 border-slate-700 text-slate-300' : 'bg-white/80 border-slate-200'} border-2 p-6 rounded-2xl
      focus:border-purple-500 focus:ring-2 focus:ring-purple-200
      outline-none transition-all duration-300 overflow-auto markdown-body ${isDarkMode ? 'markdown-dark' : ''} prose prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg prose-p:text-base prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-code:bg-gray-100 prose-code:p-1 prose-code:rounded prose-pre:bg-gray-100 prose-pre:p-4 prose-pre:rounded prose-img:rounded-lg max-w-none backdrop-blur-sm`
  }

  return (
    <>
      <div className={styles.container}>
        <div className="container mx-auto p-4 lg:p-8">
          <div className={styles.mainWrapper}>
            <div className="lg:w-1/3 order-1">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className={styles.title}>DocuMate AI</h1>
                  <p className={styles.subtitle}>Transform your files into comprehensive documentation</p>
                </div>
                <div className="flex gap-3 mx-5">
                  <input type="checkbox" name="isFolder" onClick={()=>{setIsFolder(!isFolder)}} />
                  <label htmlFor="isFolder" className='text-gray-700 dark:text-white '>Folder</label>
                </div>
                <button
                  onClick={toggleTheme}
                  className={styles.themeButton}
                >
                  {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
                </button>
              </div>

              <div className="file-upload-section space-y-6 ">
                <div className="flex items-center gap-4">
                  <div className={styles.iconContainer}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                  </div>
                  <h2 className={styles.sectionTitle}>Upload Your File</h2>
                </div>

                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={styles.dropZone}
                >
                  <div className="space-y-4">
                    <div className={styles.uploadIcon}>
                      <svg xmlns="http://www.w3.org/2000/svg" className={styles.uploadIconSvg} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <div>
                      <p className={styles.dropText}>
                        Drop your file here, or
                      </p>
                      <input
                        {...(isFolder ? {
                          webkitdirectory: "true",
                          directory: " ",
                          multiple: true
                        } : {
                          type: "file",
                          multiple: false
                        })}
                        type="file"
                        onChange={handleFileChange}
                        className={styles.fileInput}
                      />
                    </div>
                    
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <button
                    onClick={handleUpload}
                    disabled={isLoading}
                    className={styles.generateButton}
                  >
                    <span>{isLoading ? 'Generating...' : 'Generate Documentation'}</span>
                    {!isLoading && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    )}
                  </button>
                  {generatedText.length > 0 && (
                    <button
                      onClick={handleDownload}
                      className={styles.downloadButton}
                    >
                      <span>Download Documentation</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col bg-gray-800 text-white p-3 rounded-md ring-1 ring-gray-700 shadow-lg ml-auto w-full lg:max-w-2/3 ">
              <h2 className="text-2xl font-bold mb-4">Generated Documentation</h2>
              <hr/>
              {isLoading ? (
                <div className="flex items-center justify-center p-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                  <span className="ml-3">Generating documentation...</span>
                </div>
              ) : generatedText && generatedText.map((content,key)=>{
                  return <>
                    <ReactMarkdown 
                      key={key}
                      components={{
                        code({node, inline, className, children, ...props}) {
                          return <code className="bg-gray-100 dark:bg-gray-900 rounded px-1.5 py-0.5 text-sm text-gray-900 dark:text-white font-mono " {...props}>{children}</code>
                        },
                        pre({node, children, ...props}) {
                          return <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4" {...props}>{children}</pre>
                        },
                        h1: ({node, ...props}) => <h1 className="text-3xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-2 mt-8 mb-4 text-gray-900 dark:text-white" {...props} />,
                        h2: ({node, ...props}) => <h2 className="text-2xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-2 mt-6 mb-4 text-gray-900 dark:text-white" {...props} />,
                        h3: ({node, ...props}) => <h3 className="text-xl font-semibold mt-5 mb-3 text-gray-900 dark:text-white" {...props} />,
                        h4: ({node, ...props}) => <h4 className="text-lg font-semibold mt-4 mb-2 text-gray-900 dark:text-white" {...props} />,
                        h5: ({node, ...props}) => <h5 className="text-base font-semibold mt-3 mb-2 text-gray-900 dark:text-white" {...props} />,
                        h6: ({node, ...props}) => <h6 className="text-sm font-semibold mt-3 mb-2 text-gray-900 dark:text-white" {...props} />,
                        p: ({node, ...props}) => <p className="mb-4 leading-7 text-gray-900 dark:text-white" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc list-outside pl-8 mb-4 space-y-1 text-gray-900 dark:text-white" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal list-outside pl-8 mb-4 space-y-1 text-gray-900 dark:text-white" {...props} />,
                        li: ({node, ...props}) => <li className="mb-1 text-gray-900 dark:text-white" {...props} />,
                        blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 text-gray-700 dark:text-gray-300 mb-4" {...props} />,
                        table: ({node, ...props}) => <div className="overflow-x-auto mb-4"><table className="min-w-full border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" {...props} /></div>,
                        thead: ({node, ...props}) => <thead className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white" {...props} />,
                        tbody: ({node, ...props}) => <tbody className="divide-y divide-gray-300 dark:divide-gray-600 text-gray-900 dark:text-white" {...props} />,
                        tr: ({node, ...props}) => <tr className="text-gray-900 dark:text-white" {...props} />,
                        th: ({node, ...props}) => <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white" {...props} />,
                        td: ({node, ...props}) => <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white" {...props} />,
                        hr: ({node, ...props}) => <hr className="border-t border-gray-300 dark:border-gray-600 my-6" {...props} />,
                        img: ({node, ...props}) => <img className="max-w-full rounded-lg my-4" {...props} />,
                        a: ({node, ...props}) => <a className="text-blue-600 hover:underline" {...props} />,
                        strong: ({node, ...props}) => <strong className="font-semibold text-gray-900 dark:text-white" {...props} />,
                        em: ({node, ...props}) => <em className="italic text-gray-900 dark:text-white" {...props} />,
                        del: ({node, ...props}) => <del className="line-through text-gray-900 dark:text-white" {...props} />,
                      }}
                    >{content}</ReactMarkdown>                                            
                  </>
                })
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )            
}

export default App