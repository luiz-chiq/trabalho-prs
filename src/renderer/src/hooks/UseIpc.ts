import { useEffect, useCallback } from 'react'

const { ipcRenderer } = window.electron

const useIpc = (channel?: string, callback?: (event: any, data: any) => any) => {
  if (channel && callback)
    useEffect(() => {
      ipcRenderer.on(channel, callback)
      return () => {
        ipcRenderer.removeListener(channel, callback)
      }
    }, [channel, callback])

  const send = useCallback((channel: string, data?: any) => {
    ipcRenderer.send(channel, data)
  }, [])

  return { send }
}

export default useIpc
