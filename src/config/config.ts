
type settingType = {
    [key:string]: string,
}

type settingArrayType = {
    [key:string]: Array<string>,
}


export const setting:settingType = {
  "serverDns": "http://localhost:3000",
  "socketIoAdress": "http://localhost:3000/socket.io/socket.io.js"
}


export const settingArray:settingArrayType = {
    "file_picture_extension": [
        "raw", "jpeg", "jpg", "tiff", "bmp", "gif", "png"
    ]
}