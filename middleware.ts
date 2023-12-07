import {authMiddleware} from "@clerk/nextjs";

//returns a function
export default authMiddleware({
    publicRoutes: ['/', "/journal"]
});


//regEx- prevents above function from running unless it matches everything here //
export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
  };