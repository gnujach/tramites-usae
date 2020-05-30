<script>
import axios from "axios";
export default {
  name: "AddSolicitud",
  props: {
    data: {
      required: true,
      type: Object
    },
    endpoint: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      success: false,
      errors: [],
      loading: false
    };
  },
  methods: {
    async submit() {
      try {
        this.loading = true;
        await axios.post(this.endpoint, this.data);
        this.success = true;
      } catch (error) {
        this.loading = false;
        this.success = false;
        this.errors = error;
      }
    }
  },
  render() {
    return this.$scopedSlots.default({
      // Data
      error: this.error,
      loading: this.loading,
      success: this.success,
      // Methods
      submit: this.submit
    });
  }
};
</script>
