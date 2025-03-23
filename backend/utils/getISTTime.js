const getISTTime = () => {
    const currentDate = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC + 5:30
    const istTime = new Date(currentDate.getTime() + istOffset);
    return istTime;
  };

  export default getISTTime