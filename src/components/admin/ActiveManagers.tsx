"use client";

import { useState } from "react";
import {
  CheckCircle2,
  User,
  Mail,
  Phone,
  Building2,
  UserMinus,
  Edit,
  X,
  Loader2,
  FileText,
  GraduationCap,
  MapPin,
  Briefcase,
  IdCard,
  Eye,
  Calendar,
  ShieldCheck,
} from "lucide-react";
import { showConfirm, showError, showSuccess } from "@/src/lib/swal";
import { api } from "@/src/lib/api";

interface Manager {
  id: string;
  name: string;
  email: string;
  phone?: string;
  branch?: string;
  employeeId?: string;
  nid?: string;
  education?: string;
  address?: string;
  designation?: string;
  role?: string;
  status?: string;
  createdAt?: string;
}

interface ActiveManagersProps {
  managers: Manager[];
  loading: boolean;
  onRefresh: () => void;
}

export default function ActiveManagers({
  managers = [],
  loading,
  onRefresh,
}: ActiveManagersProps) {
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Edit Modal State
  const [selectedManager, setSelectedManager] = useState<Manager | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Profile View Modal State
  const [profileManager, setProfileManager] = useState<Manager | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [fetchingProfile, setFetchingProfile] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    branch: "",
    employeeId: "",
    nid: "",
    education: "",
    address: "",
    designation: "",
  });

  // Open Edit Modal
  const handleOpenEditModal = (manager: Manager) => {
    setSelectedManager(manager);
    setFormData({
      name: manager.name || "",
      phone: manager.phone || "",
      branch: manager.branch || "",
      employeeId: manager.employeeId || "",
      nid: manager.nid || "",
      education: manager.education || "",
      address: manager.address || "",
      designation: manager.designation || "",
    });
    setIsEditModalOpen(true);
  };

  // Open & Fetch Profile Details
  const handleOpenProfileModal = async (userId: string) => {
    try {
      setFetchingProfile(true);
      setIsProfileModalOpen(true);
      const res = await api.get(`/api/admin/manager-profile/${userId}`);
      setProfileManager(res.data.data);
    } catch (err: any) {
      showError(
        "ব্যর্থ হয়েছে!",
        err.response?.data?.message || "প্রোফাইল তথ্য লোড করতে সমস্যা হয়েছে।"
      );
      setIsProfileModalOpen(false);
    } finally {
      setFetchingProfile(false);
    }
  };

  // Submit Update Manager Details
  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedManager) return;

    try {
      setIsSubmitting(true);
      await api.put(`/api/admin/update-manager/${selectedManager.id}`, formData);

      await showSuccess("সফল!", "ম্যানেজারের সকল তথ্য সফলভাবে আপডেট করা হয়েছে।");
      setIsEditModalOpen(false);
      onRefresh();
    } catch (err: any) {
      showError(
        "ব্যর্থ হয়েছে!",
        err.response?.data?.message || "তথ্য আপডেট করতে সমস্যা হয়েছে।"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Demote manager
  const handleDemote = async (managerId: string, managerName: string) => {
    const isConfirmed = await showConfirm(
      "পদচ্যুত করতে চান?",
      `${managerName}-কে ম্যানেজার পদ থেকে সরিয়ে সাধারণ ব্যবহারকারী করতে চান?`
    );

    if (isConfirmed) {
      try {
        setActionLoading(managerId);
        await api.patch(`/api/admin/demote-manager/${managerId}/role`);
        await showSuccess("সফল!", `${managerName}-কে সফলভাবে পদচ্যুত করা হয়েছে।`);
        onRefresh();
      } catch (err: any) {
        showError(
          "ব্যর্থ হয়েছে!",
          err.response?.data?.message || "পদচ্যুত করতে সমস্যা হয়েছে।"
        );
      } finally {
        setActionLoading(null);
      }
    }
  };

  const safeManagers = Array.isArray(managers) ? managers : [];

  return (
    <section className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-stone-100">
        <CheckCircle2 className="h-5 w-5 text-emerald-600" />
        <h2 className="text-base font-bold text-stone-800">
          সক্রিয় ম্যানেজারবৃন্দ ({safeManagers.length})
        </h2>
      </div>

      {loading ? (
        <p className="text-xs text-stone-500 py-4">ডাটা লোড হচ্ছে...</p>
      ) : safeManagers.length === 0 ? (
        <p className="text-xs text-stone-400 py-4">কোনো সক্রিয় ম্যানেজার পাওয়া যায়নি।</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-600">
            <thead className="bg-stone-50 text-stone-700 font-semibold border-b border-stone-200">
              <tr>
                <th className="p-3">নাম ও বিবরণ</th>
                <th className="p-3">যোগাযোগ</th>
                <th className="p-3">এমপ্লয়ী আইডি</th>
                <th className="p-3">ব্রাঞ্চ</th>
                <th className="p-3 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {safeManagers.map((manager) => (
                <tr key={manager.id} className="hover:bg-orange-50/30 transition-colors">
                  <td className="p-3 font-semibold text-stone-900">
                    <div 
                      onClick={() => handleOpenProfileModal(manager.id)}
                      className="flex items-center gap-2.5 group cursor-pointer"
                      title="প্রোফাইল দেখতে ক্লিক করুন"
                    >
                      {/* ব্র্যান্ড প্রাইমারি আইকন অবতার */}
                      <div className="w-8 h-8 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center text-[#C2410C] group-hover:bg-[#C2410C] group-hover:text-white transition-colors shrink-0">
                        <User className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-stone-900 font-semibold group-hover:text-[#C2410C] transition-colors">
                          {manager.name}
                        </p>
                        {manager.designation ? (
                          <p className="text-[10px] text-stone-500 font-normal">
                            {manager.designation}
                          </p>
                        ) : (
                          <p className="text-[10px] text-[#C2410C] font-normal underline">
                            প্রোফাইল দেখুন
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="space-y-1">
                      <span className="flex items-center gap-1.5">
                        <Mail className="h-3 w-3 text-stone-400" />
                        {manager.email}
                      </span>
                      {manager.phone && (
                        <span className="flex items-center gap-1.5 text-stone-500">
                          <Phone className="h-3 w-3 text-stone-400" />
                          {manager.phone}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-3 font-medium text-stone-700">
                    {manager.employeeId ? (
                      <span className="inline-flex items-center gap-1 bg-stone-100 text-stone-700 px-2 py-0.5 rounded text-[11px]">
                        <IdCard className="h-3 w-3 text-stone-500" />
                        {manager.employeeId}
                      </span>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="p-3 font-medium text-stone-800">
                    {manager.branch ? (
                      <span className="flex items-center gap-1.5 font-semibold text-[#C2410C]">
                        <Building2 className="h-3 w-3 text-[#C2410C]" />
                        {manager.branch}
                      </span>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenProfileModal(manager.id)}
                        className="inline-flex items-center gap-1 bg-orange-50 text-[#C2410C] hover:bg-orange-100 border border-orange-200 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        প্রোফাইল
                      </button>
                      <button
                        onClick={() => handleOpenEditModal(manager)}
                        className="inline-flex items-center gap-1 bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all"
                      >
                        <Edit className="h-3.5 w-3.5" />
                        সম্পাদনা
                      </button>
                      <button
                        onClick={() => handleDemote(manager.id, manager.name)}
                        disabled={actionLoading === manager.id}
                        className="inline-flex items-center gap-1 bg-red-50 text-red-700 border border-red-200 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold hover:bg-red-100 transition-all disabled:opacity-50"
                      >
                        <UserMinus className="h-3.5 w-3.5" />
                        {actionLoading === manager.id ? "প্রসেসিং..." : "পদচ্যুত করুন"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* View Profile Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-xl relative max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-150">
            <button
              onClick={() => setIsProfileModalOpen(false)}
              className="absolute right-4 top-4 text-stone-400 hover:text-stone-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-base font-bold text-stone-800 mb-4 pb-2 border-b border-stone-100 flex items-center gap-2">
              <User className="h-5 w-5 text-[#C2410C]" />
              ম্যানেজার প্রোফাইল বিস্তারিত
            </h3>

            {fetchingProfile ? (
              <div className="flex flex-col items-center justify-center py-12 text-stone-500 gap-2">
                <Loader2 className="h-6 w-6 animate-spin text-[#C2410C]" />
                <p className="text-xs">প্রোফাইল লোড হচ্ছে...</p>
              </div>
            ) : profileManager ? (
              <div className="space-y-4 text-xs text-stone-700">
                <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-100 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#C2410C] text-white flex items-center justify-center font-bold text-base shrink-0 shadow-sm">
                    <User className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-stone-900">{profileManager.name}</h4>
                    <p className="text-stone-500">{profileManager.designation || "ম্যানেজার"}</p>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                    {profileManager.status || "ACTIVE"}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-white border border-stone-200 rounded-lg flex items-center gap-2.5">
                    <Mail className="h-4 w-4 text-[#C2410C] shrink-0" />
                    <div>
                      <p className="text-[10px] text-stone-400">ইমেইল</p>
                      <p className="font-semibold text-stone-800">{profileManager.email}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-white border border-stone-200 rounded-lg flex items-center gap-2.5">
                    <Phone className="h-4 w-4 text-[#C2410C] shrink-0" />
                    <div>
                      <p className="text-[10px] text-stone-400">ফোন নম্বর</p>
                      <p className="font-semibold text-stone-800">{profileManager.phone || "N/A"}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-white border border-stone-200 rounded-lg flex items-center gap-2.5">
                    <IdCard className="h-4 w-4 text-[#C2410C] shrink-0" />
                    <div>
                      <p className="text-[10px] text-stone-400">এমপ্লয়ী আইডি</p>
                      <p className="font-semibold text-stone-800">{profileManager.employeeId || "N/A"}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-white border border-stone-200 rounded-lg flex items-center gap-2.5">
                    <FileText className="h-4 w-4 text-[#C2410C] shrink-0" />
                    <div>
                      <p className="text-[10px] text-stone-400">জাতীয় পরিচয়পত্র (NID)</p>
                      <p className="font-semibold text-stone-800">{profileManager.nid || "N/A"}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-white border border-stone-200 rounded-lg flex items-center gap-2.5">
                    <Building2 className="h-4 w-4 text-[#C2410C] shrink-0" />
                    <div>
                      <p className="text-[10px] text-stone-400">ব্রাঞ্চ / শাখা</p>
                      <p className="font-semibold text-stone-800">{profileManager.branch || "N/A"}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-white border border-stone-200 rounded-lg flex items-center gap-2.5">
                    <ShieldCheck className="h-4 w-4 text-[#C2410C] shrink-0" />
                    <div>
                      <p className="text-[10px] text-stone-400">রোল (Role)</p>
                      <p className="font-semibold text-stone-800">{profileManager.role}</p>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-white border border-stone-200 rounded-lg flex items-start gap-2.5">
                  <GraduationCap className="h-4 w-4 text-[#C2410C] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] text-stone-400">শিক্ষাগত যোগ্যতা</p>
                    <p className="font-semibold text-stone-800">{profileManager.education || "N/A"}</p>
                  </div>
                </div>

                <div className="p-3 bg-white border border-stone-200 rounded-lg flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 text-[#C2410C] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] text-stone-400">ঠিকানা</p>
                    <p className="font-semibold text-stone-800">{profileManager.address || "N/A"}</p>
                  </div>
                </div>

                {profileManager.createdAt && (
                  <div className="p-3 bg-white border border-stone-200 rounded-lg flex items-center gap-2.5">
                    <Calendar className="h-4 w-4 text-[#C2410C] shrink-0" />
                    <div>
                      <p className="text-[10px] text-stone-400">যোগদানের তারিখ</p>
                      <p className="font-semibold text-stone-800">
                        {new Date(profileManager.createdAt).toLocaleDateString("bn-BD")}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-center text-stone-400 py-6">কোনো তথ্য পাওয়া যায়নি</p>
            )}

            <div className="flex justify-end pt-4 mt-4 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setIsProfileModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-stone-900 text-white font-semibold hover:bg-stone-800 text-xs transition-colors"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Manager Information Modal */}
      {isEditModalOpen && selectedManager && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-xl relative max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-150">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute right-4 top-4 text-stone-400 hover:text-stone-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-base font-bold text-stone-800 mb-4 pb-2 border-b border-stone-100 flex items-center gap-2">
              <User className="h-5 w-5 text-[#C2410C]" />
              ম্যানেজারের বিস্তারিত তথ্য সম্পাদনা
            </h3>

            <form onSubmit={handleUpdateSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-stone-700 font-semibold mb-1 flex items-center gap-1">
                  <User className="h-3 w-3 text-[#C2410C]" /> নাম
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-stone-200 rounded-lg px-3 py-2 outline-none focus:border-[#C2410C] focus:ring-1 focus:ring-[#C2410C]"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1 flex items-center gap-1">
                  <Phone className="h-3 w-3 text-[#C2410C]" /> ফোন নম্বর
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="01700000000"
                  className="w-full border border-stone-200 rounded-lg px-3 py-2 outline-none focus:border-[#C2410C] focus:ring-1 focus:ring-[#C2410C]"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1 flex items-center gap-1">
                  <IdCard className="h-3 w-3 text-[#C2410C]" /> এমপ্লয়ী আইডি (Employee ID)
                </label>
                <input
                  type="text"
                  value={formData.employeeId}
                  onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                  placeholder="যেমন: EMP-101"
                  className="w-full border border-stone-200 rounded-lg px-3 py-2 outline-none focus:border-[#C2410C] focus:ring-1 focus:ring-[#C2410C]"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1 flex items-center gap-1">
                  <FileText className="h-3 w-3 text-[#C2410C]" /> জাতীয় পরিচয়পত্র (NID)
                </label>
                <input
                  type="text"
                  value={formData.nid}
                  onChange={(e) => setFormData({ ...formData, nid: e.target.value })}
                  placeholder="NID নম্বর"
                  className="w-full border border-stone-200 rounded-lg px-3 py-2 outline-none focus:border-[#C2410C] focus:ring-1 focus:ring-[#C2410C]"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1 flex items-center gap-1">
                  <Building2 className="h-3 w-3 text-[#C2410C]" /> ব্রাঞ্চ / শাখা
                </label>
                <input
                  type="text"
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  placeholder="শাখার নাম"
                  className="w-full border border-stone-200 rounded-lg px-3 py-2 outline-none focus:border-[#C2410C] focus:ring-1 focus:ring-[#C2410C]"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1 flex items-center gap-1">
                  <Briefcase className="h-3 w-3 text-[#C2410C]" /> পদবী (Designation)
                </label>
                <input
                  type="text"
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  placeholder="যেমন: Branch Manager"
                  className="w-full border border-stone-200 rounded-lg px-3 py-2 outline-none focus:border-[#C2410C] focus:ring-1 focus:ring-[#C2410C]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-stone-700 font-semibold mb-1 flex items-center gap-1">
                  <GraduationCap className="h-3 w-3 text-[#C2410C]" /> শিক্ষাগত যোগ্যতা
                </label>
                <input
                  type="text"
                  value={formData.education}
                  onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                  placeholder="যেমন: B.Sc in Computer Science / Masters"
                  className="w-full border border-stone-200 rounded-lg px-3 py-2 outline-none focus:border-[#C2410C] focus:ring-1 focus:ring-[#C2410C]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-stone-700 font-semibold mb-1 flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-[#C2410C]" /> ঠিকানা
                </label>
                <textarea
                  rows={2}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="স্থায়ী বা বর্তমান ঠিকানা"
                  className="w-full border border-stone-200 rounded-lg px-3 py-2 outline-none focus:border-[#C2410C] focus:ring-1 focus:ring-[#C2410C] resize-none"
                />
              </div>

              <div className="md:col-span-2 flex justify-end gap-2 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-stone-200 text-stone-600 font-semibold hover:bg-stone-50 transition-colors"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-lg bg-[#C2410C] hover:bg-orange-800 text-white font-semibold disabled:opacity-50 flex items-center gap-1.5 transition-colors"
                >
                  {isSubmitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  তথ্য আপডেট করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}