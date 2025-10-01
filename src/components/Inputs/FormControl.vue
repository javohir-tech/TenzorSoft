<script setup>
import { computed, ref, watch } from 'vue';

//Props
const props = defineProps({
    placeholder: String,
    type: { type: String, default: 'text' },
    id: String,
    modelValue: String,
    Validator: Function,
    invalid : String
})

const emit = defineEmits(["update:modelValue"]);

const nestedValue = ref('');
const touched = ref(false);

const valid = computed(() => {
    return props.Validator ? props.Validator(nestedValue.value) : true
})

watch(nestedValue, (val) => {
    emit('update:modelValue', val)
    // console.log(nestedValue.value)
})

watch(()=> props.modelValue , (val)=>{
    nestedValue.value = val
})

</script>

<template>
    <input required class="form-control" :class="{ 'is-valid': touched && valid, 'is-invalid': touched && !valid }"
        :placeholder="props.placeholder" :id="props.id" :type="props.type" v-model="nestedValue" @blur="touched = true">
    <div class="valid-feedback">
        Looks good!
    </div>
    <div class="invalid-feedback">
        {{ invalid }}
    </div>
</template>