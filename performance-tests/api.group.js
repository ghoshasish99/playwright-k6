import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/2.4.0/dist/bundle.js";

export const options = {
  vus: 10,
  duration: '10s',
};

export default function () {
  
  group('Get userlist', function(){
    const userList = http.get('https://reqres.in/api/users?page=2');
    check(userList,{'Fetch Successful':(r)=>r.status==200})
    sleep(1)
  });

  group('Create User', function(){
    let data = {
      "name": "Ashish",
      "job": "Testing",
    }
    const newUser = http.post('https://reqres.in/api/users',JSON.stringify(data));
    check(newUser,{'Create Successful':(r)=>r.status==201})
    console.log("Created User ID "+newUser.json().id)
    sleep(3)
  });

  group('Update User', function(){
    let data = {
      "name": "Ashish",
      "job": "Testing",
    }
    const updatedUser = http.put('https://reqres.in/api/users/2',JSON.stringify(data));
    check(updatedUser,{'Update Successful':(r)=>r.status==200})
    sleep(3)
  });

  group('Delete User', function(){
    const deletedUser = http.del('https://reqres.in/api/users/2');
    check(deletedUser,{'Delete Successful':(r)=>r.status==204})
    sleep(3)
  });

}

export function handleSummary(data) {
  return {
      'TestSummaryReport.html': htmlReport(data, { debug: true })
  };
}