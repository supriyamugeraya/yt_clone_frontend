const { default: axios } = require("axios");
const { useState } = require("react");
import { config } from "../config/header.config";
import { useAuthStore, userAPIMsgAndError } from "../store";

const useSubmit = () => {
  const { token } = useAuthStore();
  const { setMsgWidthErr, res } = userAPIMsgAndError();
  const [invalidate, setInvalidate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function submitData(url, body, withMutate = false) {
    setIsLoading(true);
    try {
      if (withMutate) return await axios.post(url, body, config(token));
      let res = await axios.post(url, body, config(token));
      setMsgWidthErr({ msg: res?.data?.message, err: false });
      return res;
    } catch (e) {
      setMsgWidthErr({ msg: e?.response?.data, err: true });
      throw e;
    } finally {
      setIsLoading(false);
    }
  }
  return { isLoading, submitData, res, invalidate, setInvalidate };
};
export { useSubmit };
