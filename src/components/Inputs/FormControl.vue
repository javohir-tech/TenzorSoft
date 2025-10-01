<script setup>

</script>

<template>
    <input class="form-control" "
        required :class="{ 'is-valid': touched && valid, 'is-invalid': touched && !valid }">
    <div class="valid-feedback">
        Looks good!
    </div>
    <div class="invalid-feedback">
        Maydonni to'ldirish shart
    </div>
</template>