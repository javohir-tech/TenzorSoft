<script setup>
import { computed, ref, watch } from 'vue';

//Props
const props = defineProps({
    placeholder: String,
    type: { type: String, default: 'text' },
    id: String,
    modelValue: String,
    validator: Function,
    invalid: String
})

const emit = defineEmits(["update:modelValue"]);

const nestedValue = ref(props.modelValue || '');
const touched = ref(false);

const valid = computed(() => {
    if (props.validator) {
        return props.validator(nestedValue.value)
    }

    return nestedValue.value.trim().length > 0
})

watch(nestedValue, (val) => {
    emit('update:modelValue', val)
    // console.log(nestedValue.value)
})

watch(() => props.modelValue, (val) => {
    nestedValue.value = val
})

</script>

<template>
    <div>
        <input required class="form-control" :class="{ 'is-valid': touched && valid, 'is-invalid': touched && !valid }"
            :placeholder="props.placeholder" :id="props.id" :type="props.type" v-model="nestedValue"
            @blur="touched = true">
        <div class="valid-feedback">
            Looks good!
        </div>
        <div class="invalid-feedback">
            {{ invalid }}
        </div>
    </div>
</template>