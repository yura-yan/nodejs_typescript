import httpContext from 'express-http-context';

export function loggingBefore(request: any, response: any, next?: (err?: any) => any): any {
  console.log('set traceId = 123');
  httpContext.set('traceId', 123);
  next();
}

export function loggingAfter(request: any, response: any, next?: (err?: any) => any): any {
  console.log(`tracedId = ${httpContext.get('traceId')}`);
  next();
}
