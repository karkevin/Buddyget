import mockAxios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { setItemsLoading } from "../redux/actions/itemActions";

const mockStore = configureMockStore([thunk]);

describe("User Actions", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      users: {}
    });
  });
  describe("getUsers action creator", () => {
    it("dispatches GET_USERS action and returns data on success", async () => {
      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: [{ id: 1, name: "Vasilis" }]
        })
      );

      const user = {
        name: "Sarah",
        email: "sarah@gmail.com",
        password: "12345",
        group: "bean"
      };

      await store.dispatch(setItemsLoading());
      const actions = store.getActions();
    });
  });
});
