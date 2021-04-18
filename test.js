const axios = require("axios");
let data;
let pollCategory;
//function to register
const register = async (number) => {
  try {
    await axios.post(
      "http://localhost:3002/user/register",
      {
        name: "Bot",
        mobile_id: number,
      },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );

    console.log("Registration successful");
  } catch (error) {
    console.error(error.message);
  }
};

//funtion to login
const login = async (number) => {
  try {
    const response = await axios.post(
      "http://localhost:3002/user/log-in",
      {
        mobile_id: number,
      },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
    data = response.data;
    console.log("Login successful");
  } catch (error) {
    console.error(error.message);
  }
};
//to get a poll
const getPoll = async (poll_id) => {
  try {
    const response = await axios.get(`http://localhost:3002/poll/${poll_id}`, {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    });
    pollCategory = response.data.categories;
  } catch (error) {
    console.log(error);
  }
};
//Process vote
const processVote = () => {
  pollCategory.forEach((item) => {
    item.voted = true;
    let size = item.candidates.length;
    let arr = [];

    arr[Math.floor(Math.random() * size)] = true;
    item.candidates.forEach((obj, index) => {
      obj.voted = arr[index];
    });
  });
};
//to vote

const vote = async (poll_id) => {
  const category = pollCategory;
  try {
    const response = await axios.post(
      `http://localhost:3002/poll/vote/`,
      {
        pollId: poll_id,
        vote: { categories: category },
      },
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${data.token}`,
        },
      }
    );
    if (response.status === 200) {
      console.log("Vote Success");
    }
  } catch (error) {
    console.error(error.message);
  }
};
//take action
const action = async (number) => {
  const poll_id = "607c772497f23416848830e7";
  try {
    await register(number);
    await login(number);
    await getPoll(poll_id);
    await processVote();
    await vote(poll_id);
  } catch (error) {
    console.error(error);
  }
};
setInterval(async () => {
  let num = `${Math.round(Math.random())}`;
  for (let i = 0; i < 8; i++) {
    num += `${Math.floor(Math.random() * 10)}`;
  }
  const mobileNum = "08" + num;
  // const mobileNum = "08108405421";
  try {
    await action(mobileNum);
    // data = await "";
  } catch (error) {
    console.error(error.message);
  }
}, 1000);
