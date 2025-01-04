import './App.css'

function App() {

  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <img src='/spy_icon.svg' className='w-48 h-48'></img>
      <h1 className='text-6xl font-bold py-16'>Spyfall</h1>
      <div className='flex justify-items-center flex-col w-28 space-y-4 mx-auto'>
        <button className='border rounded-md p-1.5 border-slate-400 bg-slate-300 hover:bg-slate-500 hover:text-white'>Create Game</button>
        <button className='border rounded-md p-1.5 border-slate-400 bg-slate-300 hover:bg-slate-500 hover:text-white'>Join Game</button>
      </div>
    </div>
  )
}

export default App
