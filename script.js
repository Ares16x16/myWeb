document.addEventListener('DOMContentLoaded', function() {

  const scanButton = document.getElementById('scan-button');
  const urlInput = document.getElementById('url-input');
  const fileInput = document.getElementById('file-input');
  const fileDownloadButton = document.getElementById('download-button');
  const videoPreview = document.querySelector('.video-preview');
  const videoDownloadButton = document.querySelector('.video-download');

  var videoId = '';

  scanButton.addEventListener('click', function() {
    var url = urlInput.value;
    if (url.indexOf('youtube.com/embed') !== -1) {
      var iframeHtml = "<iframe width='420' height='315' src='" + url + "' frameborder='0' allowfullscreen></iframe>";
      console.log(iframeHtml)
      $('.video-preview').html(iframeHtml);
      $('#download-text-1').text('');
    } else if (url.indexOf('youtube.com/watch') !== -1){
      var url1 = url.split('&ab_channel=')[0];
      videoId = url1.split('v=')[1];
      var embedUrl = 'https://www.youtube.com/embed/' + videoId;
      var iframeHtml = "<iframe width='700' height='350' src='" + embedUrl + "' frameborder='0' allowfullscreen></iframe>";
      console.log(iframeHtml)
      $(videoPreview).html(iframeHtml);
      $('#download-text-1').text('');
    }
  });

  videoDownloadButton.addEventListener('click', async function() {
    const VIDEO_ID = videoId;
    const VIDEO_URL = `https://www.youtube.com/watch?v=${VIDEO_ID}`;
    var text = 'Failed to download video. Function not yet available';
    $('#download-text-1').text(text);
  });

  fileDownloadButton.addEventListener('click', async function() {
    try {
      const response = await fetch(fileInput.value);
      const file = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(file);
      link.download = new Date().getTime();
      link.click();
      var text = 'File downloaded. Saved as ' + link.download +'.';
      $('#download-text-1').text(text);
    } catch(error) {
      alert("Failed to download file")
    }
    
  });
});
