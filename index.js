import * as sampleJSON from './sample.postman_collection.json';
import PostmanFetch from './PostmanFetch';

const { fetch } = new PostmanFetch(sampleJSON, {
  variables: {
    url: 'https://hapito.app/api/v1',
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjQwMzA0NmNhZjQ4MDYwMzc5Y2JkNzZlZGU4NjYxOTMxNzVhNzY0ZjZhMmRlMzViNTJmMDY0MGVkNThkN2YzNGQ2YzBlM2EyYTk4M2E5ZGFiIn0.eyJhdWQiOiIxIiwianRpIjoiNDAzMDQ2Y2FmNDgwNjAzNzljYmQ3NmVkZTg2NjE5MzE3NWE3NjRmNmEyZGUzNWI1MmYwNjQwZWQ1OGQ3ZjM0ZDZjMGUzYTJhOTgzYTlkYWIiLCJpYXQiOjE1Mzc1MzMxMjUsIm5iZiI6MTUzNzUzMzEyNSwiZXhwIjoxNTY5MDY5MTI1LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.rsNJECHSmprIrprxmwbktubnN_VDUno5MjQS42HLnDjx0fK4krgQfj5lEMRgNOowawR18c-48f4GxD1uAv0rBA8dSEc7VmSQoHEc8GJ8BsHx5B112UGRkJzj0zXHfWxy2LO_XCHrKN7oY4tSG-NLcW8zsDwYUyabsyQUznwdXIFWOfB5FRwi6QqI5ExpakMzKeIolZ-ADQY-XohhluJokCxLsu2_f1xZSbypL051PtbYQ99hswwIxoySQEesItq49RuG3G65PxFfAz_r8L8ao0UZAVSDxvTlzFZFo6-LZZ2TZZRLlQaFQy462xixzA7gpum4WJqccREcnG9uAPKTB_MMtrL_EEssMoYtXR1yxAbWSnmBqHN9H6xI3-adKcBKnX5pUmnDxgUZ3pcqL2Yrkpqokf1FKrvsAetvHgfL1zseBMuRaR3h0f6pM3xZvSPNxpulD-M4tmCcvp2h55ndWTti_IxC1kIwimoh0pmY6bzWgiLIx4hHORYojGOzsdQR5akESkGlapBiTQJEB9j81CjVbRgJKv6668Y58fRdYoC0yvydiBLmtutGeokKrcoqxn55mYYhfct7TRGO6tR3GSLwC0uz6cO1MQwQGqwTKOMPmg86zdGeQnmW5LZGk6H7CsgkWPnSGE7z57C3f_fAP2lRi95IixVGALb8wTRM0rU'
  },
  debug: true
});

fetch('User.Update Profile', {
  validate: true,
  body: {name: '', cart_number: 2, birth_date: '3', favorite_color: 'sa' }
});

export default PostmanFetch;
