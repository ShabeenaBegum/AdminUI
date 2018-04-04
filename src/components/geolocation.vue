<template>
    <input
            type="text"
            class="form-control"
            :id="id"
            placeholder="Start typing"/>
</template>

<script>
    export default {
        name: "geolocation",
        props: {
            id: {
                type: String,
                required: true
            },
        },
        data() {
            return {
                address: {
                    locality: '',
                    city: '',
                    state: '',
                    country: '',
                    formatted_address: '',
                    place_name: ''
                }
            }
        },
        mounted() {
            let vm = this;
            let autocomplete = new google.maps.places.Autocomplete((document.getElementById(vm.id)), {types: ['geocode']});
            autocomplete.addListener('place_changed', function () {
                vm.address = {
                    locality: '',
                    city: '',
                    state: '',
                    country: '',
                    formatted_address: '',
                    place_name: ''
                };
                let place = autocomplete.getPlace();
                let address = place.address_components;
                if (address) {
                    for (let i = address.length - 1; i >= 0; i--) {
                        let add = (address[i]);
                        if (add.types[0] === "sublocality_level_1") {
                            vm.address.locality = add.long_name;
                        }
                        if (add.types[0] === "locality") {
                            vm.address.city = add.long_name;
                        }
                        if (add.types[0] === "administrative_area_level_1") {
                            vm.address.state = add.long_name;
                        }
                        if (add.types[0] === "country") {
                            vm.address.country = add.long_name;
                        }
                    }
                    vm.address.formatted_address = place.formatted_address;
                    vm.address.place_name = place.name;
                }
                vm.$emit("input", vm.address);
                vm.$emit("changed", vm.address);
            });
        }
    }
</script>

<style scoped>

</style>