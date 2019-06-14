import k6http from "k6/http";
import { sleep } from "k6";

export let options = {
  vus: 10,
  duration: "30s"
};

export default function() {
  var url = "http://localhost:7474/db/data/transaction/commit";
  var payload = JSON.stringify({ 
    statements: [ {
      statement: "MATCH (a:Listing {id: 99})-[:RECOMMENDS]->(b:Listing) RETURN b"   
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