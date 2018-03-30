<template>
    <div class="card card-default table-card">
        <div class="card-header">
            <div class="flex space-between">
                <div>
                    <div class="flex space-between">
                        <button class="btn btn-filter mr-2">
                            <i class="fa fa-filter" aria-hidden="true"></i>
                            &nbsp;Filter
                        </button>
                        Mentor management
                    </div>
                </div>
                <!--<div>-->
                <!--<input type="text" class="form-control filter-search" placeholder="search batches..">-->
                <!--</div>-->
                <div>
                    <button class="btn btn-filter">
                        <i class="fa fa-cloud-download" aria-hidden="true"></i>
                        &nbsp;Export
                    </button>
                </div>
            </div>
        </div>
        <div class="card-body">
            <table class="table table-hover">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td colspan="2">Larry the Bird</td>
                    <td>@twitter</td>
                </tr>
                </tbody>
            </table>
            <div class="bottom-table  mb-3">
                <strong class="ml-2">3 Results</strong>
                <div class="pagination-table float-right">
                    <button class="btn btn-filter mr-3">
                        Next
                    </button>
                    <button class="btn btn-filter  mr-3">
                        Previous
                    </button>
                </div>
            </div>


        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                options: [
                    {countryCode: "AU", countryName: "Australia"},
                    {countryCode: "CA", countryName: "Canada"},
                    {countryCode: "CN", countryName: "China"},
                    {countryCode: "DE", countryName: "Germany"},
                    {countryCode: "JP", countryName: "Japan"},
                    {countryCode: "MX", countryName: "Mexico"},
                    {countryCode: "CH", countryName: "Switzerland"},
                    {countryCode: "US", countryName: "United States"}
                ]
            }
        }
    }
</script>