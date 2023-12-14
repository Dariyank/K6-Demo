# K6 initial project

This is a simple project using the Grafana K6 tool. Here, we created a load test for [K6 crocodiles points](https://test-api.k6.io/public/crocodiles). The project consists of two tests, one to search for an existing crocodile in the list and another to search for a non-existing one.

## Setting up

### Dependencies

1. Make sure to install K6 in your system
- [K6](https://k6.io/open-source/)

2. Libriries in the project:
- [K6 HTML report](https://github.com/benc-uk/k6-reporter#k6-html-report-exporter-v2)

### Running 

In orde to execute the project run the following command line

```bash
k6 run ./tests/findCrocodiles.js
```

At the end of every run, a report will be generated in the folder `reports`. If you wish to change the location, go to line 35 in `../tests/findCrocodiles.js` and modify the destination.

```javascript
export function handleSummary(data) {
    //...  helper code here
    return {
        [`folderName/reportFileName.html`]: htmlReport(data),
    };
}
```

## Naming Conventions

- Use `lowerCamelCase`for variables, properties, files and folder names. 
- Use prefix like `is`, `are`, or `has` for bool variables.
- Use self explanatory names for variables, E.g `let fields`.
- Always start functions with a verb and the entity being affect by it, E.g `registerUser()`.

