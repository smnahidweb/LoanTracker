import Swal from "sweetalert2";

export const showSuccess = (title: string, text?: string) => {
  return Swal.fire({
    icon: "success",
    title,
    text,
    confirmButtonColor: "#C2410C", // আপনার প্রজেক্টের থিম কালার
    customClass: {
      popup: "rounded-2xl border border-stone-200 shadow-xl",
      confirmButton: "rounded-lg text-xs font-semibold px-4 py-2",
    },
  });
};

export const showError = (title: string, text?: string) => {
  return Swal.fire({
    icon: "error",
    title,
    text,
    confirmButtonColor: "#C2410C",
    customClass: {
      popup: "rounded-2xl border border-stone-200 shadow-xl",
      confirmButton: "rounded-lg text-xs font-semibold px-4 py-2",
    },
  });
};

export const showConfirm = async (title: string, text: string) => {
  return Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#C2410C",
    cancelButtonColor: "#78716C",
    confirmButtonText: "হ্যাঁ, নিশ্চিত করুন",
    cancelButtonText: "বাতিল",
    customClass: {
      popup: "rounded-2xl border border-stone-200 shadow-xl",
      confirmButton: "rounded-lg text-xs font-semibold px-4 py-2",
      cancelButton: "rounded-lg text-xs font-semibold px-4 py-2",
    },
  });
};