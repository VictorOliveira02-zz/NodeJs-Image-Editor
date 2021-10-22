const sharp = require('sharp');
const compress_images = require('compress-images');
const fs = require('fs');

let path = "original.jpg";
let width = 500;

function resize(pathInput, outputPath, width, angle = 180) {
    sharp(pathInput).resize({ width: width }).rotate(angle)
        .toFile(outputPath, (error) => {
            error ?
                console.log(error)
                :
                compress(outputPath, "./Images-Edit/compressed/")
        })
}


function compress(pathInput, outputPath) {
    compress_images(pathInput, outputPath, { compress_force: false, statistic: true, autoupdate: true }, false,
        { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
        { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
        { svg: { engine: "svgo", command: "--multipass" } },
        { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
        function (error, completed, statistic) {
            console.log("-------------");
            console.log(error);
            console.log(completed);
            console.log(statistic);
            console.log("-------------");

            fs.unlink(pathInput, (error) => {
                error ? console.log(error) : console.log("Image Temp File Delete!")
            })

        }

    );
}



resize(path, './Images-Edit/temp/output_resize.jpg', width)