import EstablishmentController from 'App/Controllers/EstablishmentController';
import CrudController, { BaseHttpResponse } from 'App/Controllers/Base/CrudController';
import BodyMiddleware from 'App/Middleware/BodyMiddleware';

import Utils from 'App/Services/Utils';
import ExceptionMiddleware from 'App/Middleware/ExceptionMiddleware';
import OrmMiddleware from 'App/Middleware/OrmMiddleware';

type MethodDefinition = {
  [prefix:string]: string
}

type RouteDefinition = {
  [prefix: string]: {
    methods: MethodDefinition
    controller: CrudController<any, any>
  }
}

const routes: RouteDefinition = {
  establishment: {
    methods: {
      create: 'create'
    },
    controller: new EstablishmentController(),
  }
};

Object.entries(routes).forEach(([prefix, methodDefinition]) => {
  Object.values(methodDefinition.methods).forEach((controllerMethod) => {
    module.exports[`${prefix}${Utils.capitalize(controllerMethod)}`] = async (event, context): Promise<BaseHttpResponse> => {
      
      let response: BaseHttpResponse = {
        statusCode: 500,
        body: {
          message: 'Internal server error'
        }
      }
      
      try {
        await beforeMiddleware(event, context)        
        response = await methodDefinition.controller[controllerMethod as any](event, context)
      } catch( error) {
        ExceptionMiddleware.handle(response, error);
      }
      
      await afterMiddleware(event, context, response)

      return response
    }
  })
})

async function beforeMiddleware(event, context) {
  BodyMiddleware.requestParser(event, context)        
  await OrmMiddleware.init()
}

async function afterMiddleware(event, context, response) {
  BodyMiddleware.responseParser(response, context)
}