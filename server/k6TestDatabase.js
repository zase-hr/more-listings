import k6http from "k6/http";
import { sleep } from "k6";

export let options = {
  stages: [
    { duration: "10s", target: 300 },
    { duration: "30s", target: 3000 }
  ],
};

export default function() {
  var url = "http://127.0.0.1:7474/db/data/transaction/commit";
  var payload = JSON.stringify({ 
    statements: [ {
      statement: `MATCH (a:Listing {id: ${Math.ceil(Math.random()*10000000)}})-[:RECOMMENDS]->(b:Listing) RETURN b`   
    } ]
  });
  var headers = {
      "Accept": "application/json; charset=UTF-8",
      "Content-Type": "application/json",
      "Authorization": "Basic bmVvNGo6aG9kYWs="
    };
  k6http.post(url, payload, headers);
  sleep(1);
};
