const error = (status: number = 500, message: string = "Something went wrong") => {
    return { status, message };
};


  export default error;