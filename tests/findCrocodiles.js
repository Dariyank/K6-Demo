import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { group } from 'k6';
import { requestCrocodile, requestInvalidCrocodile } from '../modules/requestCrocodile.js'

const url = "https://test-api.k6.io/public/crocodiles/";

export let options = {
    thresholds: {
        checks: ['rate>0.75'], 
        http_req_duration: ['p(75)<3000'],
    },
    scenarios: {
        crocodiles: {
            executor: "per-vu-iterations",
            vus: 10,
            iterations: 5,
            maxDuration: '50s',
        }
    },
};

export default function () {
    group("Searching for an existing crocodile", function () {
        requestCrocodile(url);
    })

    
    group("Searching for a non-existing crocodile", function () {
        requestInvalidCrocodile(url, 9);
    })
};


export function handleSummary(data) {
    let time = Date.now();
    return {
        [`reports/report-${time}.html`]: htmlReport(data),
    };
}