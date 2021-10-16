const jwt = require("jsonwebtoken");
require("dotenv").config();
const authenticate = require("./authenticate");
const { User } = require("../models");
const { SECRET_KEY } = process.env;

describe("Auth middleware test", () => {
  it("should called next() and added user property to req object", async () => {
    const mockUserId = "123123123";
    const token = jwt.sign({ _id: mockUserId }, SECRET_KEY);
    const user = {
      _id: mockUserId,
      email: "test@email.com",
      token,
    };

    const mReq = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const mRes = {};
    const mockNext = jest.fn();

    jest.spyOn(User, "findById").mockImplementationOnce(async () => user);

    await authenticate(mReq, mRes, mockNext);

    expect(mReq.user).toEqual(user);
    expect(mockNext).toHaveBeenCalled();
  });

  // it("Called without passing the authorization key", async () => {
  //   const mockUserId = "123123123";
  //   const mReq = {
  //     headers: {
  //       authorization: undefined,
  //     },
  //   };
  //   const mRes = {
  //     status: jest.fn(),
  //     json: jest.fn(),
  //   };

  //   const mockNext = jest.fn();

  //   await authenticate(mReq, mRes, mockNext);

  //   expect(mReq.user).toEqual(user);
  //   expect(mockNext).toHaveBeenCalled();
  // });
});
