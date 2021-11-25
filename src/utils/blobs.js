/**
 * 
 * 
 * DO NOT CHANGE THIS FILE
 * 
 * 
 * contains all required headers and resources for requests to azure blob storage
 * 
 * 
 */


const azureStorageURL = 'https://loopr.blob.core.windows.net/audio-files/';
const versionHeader = '2020-10-02';
const sasKey = '?sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacupitfx&se=2021-12-31T08:00:00Z&st=2021-10-31T00:00:00Z&spr=https,http&sig=tPbcr4ns8nBMFP4U3kKncVsIA6bPxl%2Fazbc%2BcMvatFg%3D'

const getAllBlobs = async () => {
    // set up request
    const getAllQueryString = "?restype=container&comp=list";
    const getAllURL = azureStorageURL + getAllQueryString;
    const blobHeaders = new Headers();
    blobHeaders.append('x-ms-version', versionHeader);

    // make request and return all blobs
    return await fetch(getAllURL, {
        headers: blobHeaders
    })
    .then(res => res.text())
    .then(async res => {
        // parse xml response to get blob names
        let parser = new DOMParser();
        let xml = parser.parseFromString(res, "application/xml");
        let blobNames = xml.getElementsByTagName('Name');

        // make more requests to get actual blobs
        let blobList = [];
        for (let blobName of blobNames) {
            let blob = await getBlob(blobName.firstChild.nodeValue);
            blobList.push(blob);
        }

        // return the list of blobs
        return blobList;
    });
};

// Utility for getting only blob names from database (for user selection of specific audio)
const getBlobNames = async () => {

    // Returns a dictionary of Etag / Name pairs
    var entries = [];

    // set up request
    const getAllQueryString = "?restype=container&comp=list";
    const getAllURL = azureStorageURL + getAllQueryString;
    const blobHeaders = new Headers();
    blobHeaders.append('x-ms-version', versionHeader);

    // make request and return all blobs
    return await fetch(getAllURL, {
        headers: blobHeaders
    })
    .then(res => res.text())
    .then(async res => {
        // parse xml response to get blob names
        let parser = new DOMParser();
        let xml = parser.parseFromString(res, "application/xml");
        let blobNames = xml.getElementsByTagName('Name');
        let blobIDs = xml.getElementsByTagName('Etag');

        for(var i = 0; i < blobNames.length; i ++){
            var temp = {value: blobIDs[i].innerHTML, label: blobNames[i].innerHTML};
            entries.push(temp);
        }

        return entries;
    });
};

const getBlob = async (blobName) => {
    let mediaBlob = await fetch((azureStorageURL + blobName)).then(res => res.blob());
    let mediaBlobUrl = window.URL.createObjectURL(mediaBlob);
    //let mediaBlobUrl = "https://loopr.blob.core.windows.net/audio-files/"+blobName
    return { mediaBlobUrl, saved: true };
    //return { mediaBlob, saved: true };
};

const postBlob = async (blob, name) => {
    // add required headers
    const blobHeaders = new Headers();
    blobHeaders.append('x-ms-version', versionHeader);
    blobHeaders.append('x-ms-blob-type', 'BlockBlob');
    blobHeaders.append('x-ms-date', Date.now());
    blobHeaders.append('Content-Length', blob.size);
    blobHeaders.append('Content-Type', 'audio/mpeg');

    // build url for post request
    const postURL = azureStorageURL + name + sasKey;
    
    // send request
    await fetch(postURL, {
        method: 'PUT',
        headers: blobHeaders,
        body: blob
    })
    .then(res => {
        if (res.ok) {
            alert("Audio file saved!");
        } else {
            alert("Something went wrong with saving the audio file: " + res.statusText);
        }
    })
    .catch(err => {
        console.log(err);
        alert("Error: " + err);
    });
};

export { getAllBlobs, getBlob, postBlob, getBlobNames };
