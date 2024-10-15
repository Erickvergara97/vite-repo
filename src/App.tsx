import './index.css'

function App() {
  return (
    <div id='app' className='relative h-screen p-2 gap-2'>
      <aside className='[grid-area:aside] flex-col flex overflow-y-auto bg-blue-100'>
        ASIDE
      </aside>
      <main className='[grid-area:main] rounded-lg bg-zinc-900 overflow-y-auto bg-red-200'>
        MAIN
      </main>
      <footer className='[grid-area:player] min-h-[100px]'>PLAYER</footer>
    </div>
  )
}

export default App
