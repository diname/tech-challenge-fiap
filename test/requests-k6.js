import { sleep } from 'k6';
import http from 'k6/http';

export let options = {
  vus: 200,
  duration: '120s',
};

export default function () {
  http.get('http://localhost:30100/products');
  sleep(1);
}