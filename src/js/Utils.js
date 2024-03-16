
async function sendResponse(res, result){
	let status = result.status
	if (!status) status = result.success ? 200 : 400

	return res.status(status).send(result.message)
}

module.exports = {
    sendResponse
}