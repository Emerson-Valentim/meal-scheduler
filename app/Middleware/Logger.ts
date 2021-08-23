import { BaseHttpResponse } from "App/Controllers/Base/CrudController";
import { APIGatewayEvent } from "aws-lambda";

export default abstract class Logger {
    public static OutgoingResponse(event: APIGatewayEvent, context, response: BaseHttpResponse | null) {
        const { body, headers, httpMethod, path, requestContext: { identity: { sourceIp } } } = event
        const { awsRequestId } = context
        const request = {
            body,
            headers,
            sourceIp,
            httpMethod,
            path,
            awsRequestId
        }

        if (response) {
            process.env.ENV !== 'local' && console.log(JSON.stringify({
                level: 'INFO',
                request,
                response
            }))
        }
    }
}