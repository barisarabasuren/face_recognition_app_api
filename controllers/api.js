const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set("authorization", "Key d7d55c92dfe1415687a937fa7c8a1495");

exports.handleApiCall = (req, res) => {
    const { imageUrl } = req.body;
    
    stub.PostModelOutputs(
        {
            // This is the model ID of a publicly available General model. You may use any other public or custom model ID.
            model_id: "f76196b43bbd45c99b4f3cd8e8b40a8a",
            inputs: [{data: {image: {url: imageUrl}}}]
        },
        metadata,
        (err, response) => {
            if (err) {
                console.log("Error: " + err);
                return;
            }
    
            if (response.status.code !== 10000) {
                console.log("Received failed status: " + response.status.description + "\n" + response.status.details);
                return;
            }
            res.json(response)
        }
    );
}