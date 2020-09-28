(() => {
  particlesJS.load('particles-js', 'particles.json', () => {})

  const $modelDropzone = document.getElementById('model-dropzone')
  const $modelFile = document.getElementById('model-file')
  const $modelFileName = document.getElementById('model-file-name')
  const $modelSend = document.getElementById('model-send')
  let fileToUpload;

  ;['dragcenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    $modelDropzone.addEventListener(eventName, evt => {
      evt.preventDefault()
      evt.stopPropagation()
    })
  })

  ;['dragcenter', 'dragover'].forEach(eventName => {
    $modelDropzone.addEventListener(eventName, evt => {
      $modelDropzone.classList.add('model-dropzone-highlight')
    })
  })

  ;['dragleave', 'drop'].forEach(eventName => {
    $modelDropzone.addEventListener(eventName, evt => {
      $modelDropzone.classList.remove('model-dropzone-highlight')
    })
  })

  $modelDropzone.addEventListener('drop', evt => {
    fileToUpload = evt.dataTransfer.files[0]
    updateFileName()
  })

  $modelFile.addEventListener('change', evt => {
    fileToUpload = evt.target.files[0]
    updateFileName()
  })

  function updateFileName() {
    if (fileToUpload == null) {
      $modelFileName.innerText = ''
      $modelFileName.classList.remove('model-file-name-visible')
      return
    }

    $modelFileName.innerText = `Arquivo selecionado: ${fileToUpload.name}`
    $modelFileName.classList.add('model-file-name-visible')
  }

  function httpRequest(url, method, data) {
    return fetch(url, {
      method: method,
      body: (data instanceof FormData) ? data : JSON.stringify(data),
      headers: (data instanceof FormData) ? {} : { 'Content-Type': 'application/json' }
    }).then(response => {
      if (response.ok) return response
      return response.json().then(errData => {
        const error = new Error('Something went wrong with your request. Check error data.')
        error.data = errData
        throw error
      })
    })
  }
})()

