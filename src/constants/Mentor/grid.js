export default {
    cols: [
        {
            name: "Name",
            key: "name"
        },
        {
            name: "Email",
            key: "email"
        },
        {
            name: "Phone",
            key: "phone"
        },
        {
            name: "PAN",
            key: "pan"
        },
        {
            name: "Course Id",
            key: "course_id"
        },
        {
            name: "Edit",
            key: "edit"
        }
    ],
    filters: [
        {
            "display_name": "Name",
            "enable": true,
            "key": "name",
            "operator": "eq",
            "value": "",
            options: [
                {
                    display_name: "is equal to",
                    operator: "eq",
                },
                {
                    display_name: "contains",
                    operator: "contains",
                }
            ]
        },
        {
            "display_name": "Email",
            "enable": false,
            "operator": "eq",
            "key": "_id",
            "value": "",
            options: [
                {
                    display_name: "is equal to",
                    operator: "eq",

                },
                {
                    display_name: "contains",
                    operator: "contains",
                }
            ]
        }
    ],
}
