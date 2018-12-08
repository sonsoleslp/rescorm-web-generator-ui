import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils';
import FileSaver from 'file-saver';

export const generatePackage  = (state) => {
    let zip_title = "scorm.zip"
 
    JSZipUtils.getBinaryContent("scorm12.zip", function(err, data) {
        if (err) {
            console.error(1);
            throw err; // or handle err

        }
        JSZip.loadAsync(data).then(function(zip) {
        	console.log(zip)
        	let indexContent = generateIndex(state)
			zip.file('index.html', indexContent);
			zip.generateAsync({ type: "blob" }).then(function(blob) {
                // FileSaver.saveAs(blob, "ediphyvisor.zip");
                FileSaver.saveAs(blob, state.title.toLowerCase().replace(/\s/g, '') + Math.round(+new Date() / 1000) + (state.scormVersion === "2004" ? "_2004" : "_1.2") + ".zip");
            });
        }) 
    });
 

}

function generateIndex(state) {
	return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>RESCORM Boilerplate</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
 </head>
<body>
<div id="root"></div>
<script> window.config=JSON.parse('${JSON.stringify({...state, content: undefined})}');</script>
<script type="text/javascript" src="bundle.js"></script>
</body>
</html>`;
}