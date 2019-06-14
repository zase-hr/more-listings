import k6http from "k6/http";
import { sleep } from "k6";

export let options = {
  vus: 100,
  duration: "120s"
};

export default function() {
  var url = `http://localhost:3005/${Math.ceil(Math.random() * 9999999)}/RecommendedListings`;
  k6http.get(url);
  sleep(1);
};