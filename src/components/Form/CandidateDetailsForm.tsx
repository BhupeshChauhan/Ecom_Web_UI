// TODO: Refactor as number of lines is 300+
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderMask } from "../Loader";
import { InfoPopUp } from "../../utils/AlearUtils";
import JobService from "../../Api/JobService";
import { z } from "zod";
import useModal from "../../hooks/useModal";
import { v4 as uuidv4 } from "uuid";
import { ExperienceModalContent } from "../Candidate/ExperienceModalContent";
import { EducationModalContent } from "../Candidate/EducationModalContent";
import { CandidateDetailsLeftCol } from "../Candidate/CandidateDetailsLeftCol";
import { CandidateDetailsRightCol } from "../Candidate/CandidateDetailsRightCol";

export interface CandidateFormData {
  name: string;
  email: string;
  designation: string;
  phone: string;
  experience: string;
}

export const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z
    .string()
    .min(1, { message: "Please enter a valid email" })
    .email({ message: "Not a valid email" }),
  designation: z.string().min(2, {
    message: "Designation is required",
  }),
  phone: z.string(),
  experience: z.string().min(1, {
    message: "Experience must be at least 1 characters.",
  }),
});

const CandidateDetailsForm = () => {
  const { isLoading, data, GetCandidateDetails, UpdateCandidateDetails } =
    JobService();
  const { openModal, setOpenModal, ModalComp } = useModal();
  const [modalType, setModalType] = useState("");
  const [requiredSkills, setRequiredSkills] = useState("");
  const [requiredSkillsArray, setRequiredSkillsArray] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [selectedEducation, setSelectedEducation] = useState(null);

  const handleSkillUpdate = (value: any) => {
    if (value?.length > 0) {
      const requiredSkillsSplit = value.split(",");
      if (requiredSkillsSplit.length > 1) {
        requiredSkillsSplit.map((element) => {
          setRequiredSkillsArray((prev) => [
            ...prev,
            {
              id: uuidv4(),
              value: element,
            },
          ]);
        });
      } else {
        setRequiredSkillsArray((prev) => [
          ...prev,
          {
            id: uuidv4(),
            value: value,
          },
        ]);
      }
      setRequiredSkills("");
    }
  };

  const onModalClose = () => {
    setOpenModal(false);
    setSelectedExperience(null);
    setSelectedEducation(null);
    setModalType("");
  };
  const handleSaveExperience = async (experienceData) => {
    const pastWorkExperience = JSON.parse(data.workExperience || "[]");
    const updatedExperiences = selectedExperience
      ? pastWorkExperience.map((exp) =>
          exp.id === selectedExperience.id ? { ...experienceData } : exp,
        )
      : [...pastWorkExperience, { ...experienceData, id: uuidv4() }];

    await UpdateCandidateDetails({
      workExperience: JSON.stringify(updatedExperiences),
    });
    onModalClose();
    await GetCandidateDetails(
      location.pathname.split("/")[1] === "jobs"
        ? location.pathname.split("/")[5]
        : location.pathname.split("/")[2],
    );
  };

  const handleDeleteExperience = async () => {
    if (!selectedExperience) return;

    const updatedExperiences = JSON.parse(data.workExperience || "[]").filter(
      (exp) => exp.id !== selectedExperience.id,
    );

    await UpdateCandidateDetails({
      workExperience: JSON.stringify(updatedExperiences),
    });
    await GetCandidateDetails(
      location.pathname.split("/")[1] === "jobs"
        ? location.pathname.split("/")[5]
        : location.pathname.split("/")[2],
    );
    onModalClose();
  };

  const handleSaveEducation = async (educationData) => {
    console.log("educationData", educationData);
    const pastEducation = JSON.parse(data.education || "[]");
    console.log("pastEducation", pastEducation);
    if (selectedEducation) {
      // Edit mode - update existing education
      const updatedEducation = pastEducation.map((edu) =>
        edu.id === selectedEducation.id ? { ...educationData } : edu,
      );
      await UpdateCandidateDetails({
        education: JSON.stringify(updatedEducation),
      });
    } else {
      // Add mode - append new education
      await UpdateCandidateDetails({
        education: JSON.stringify([
          ...pastEducation,
          { ...educationData, id: uuidv4() },
        ]),
      });
    }
    setOpenModal(false);
    await GetCandidateDetails(
      location.pathname.split("/")[1] === "jobs"
        ? location.pathname.split("/")[5]
        : location.pathname.split("/")[2],
    );
    setSelectedEducation(null);
  };

  const handleDeleteEducation = async () => {
    if (!selectedEducation) return;

    const pastEducation = JSON.parse(data.education || "[]");
    const updatedEducation = pastEducation.filter(
      (edu) => edu.id !== selectedEducation.id,
    );

    await UpdateCandidateDetails({
      education: JSON.stringify(updatedEducation),
    });
    await GetCandidateDetails(
      location.pathname.split("/")[1] === "jobs"
        ? location.pathname.split("/")[5]
        : location.pathname.split("/")[2],
    );
    setOpenModal(false);
    setSelectedEducation(null);
  };

  const handleRequiredSkillsChange = (e) => {
    setRequiredSkills(e.target.value);
  };

  const handleSkillSubmit = () => {
    if (requiredSkills.length > 0) {
      const requiredSkillsSplit = requiredSkills.split(",");
      if (requiredSkillsSplit.length > 1) {
        requiredSkillsSplit.map((element) => {
          setRequiredSkillsArray((prev) => [
            ...prev,
            {
              id: uuidv4(),
              value: element,
            },
          ]);
        });
      } else {
        setRequiredSkillsArray((prev) => [
          ...prev,
          {
            id: uuidv4(),
            value: requiredSkills,
          },
        ]);
      }
      setRequiredSkills("");
    }
  };

  const handleClearSkill = (id) => {
    const newArray = requiredSkillsArray.filter((element) => element.id !== id);
    setRequiredSkillsArray(newArray);
  };

  const defaultValues = useMemo(
    () => ({
      name: data?.name || "",
      designation: data?.designation || "",
      email: data?.email || "",
      phone: data?.phone || "",
      experience: data?.experience || "",
    }),
    [data],
  );

  const form = useForm<CandidateFormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = useCallback(
    async (values: CandidateFormData) => {
      if (
        Object.keys(form.formState.dirtyFields).length > 0 ||
        requiredSkillsArray.length > 0
      ) {
        await UpdateCandidateDetails({
          ...values,
          skills: requiredSkillsArray.map((skill) => skill.value).join(","),
        });
      } else {
        InfoPopUp("Please make changes before submitting");
      }
    },
    [form.formState.dirtyFields, UpdateCandidateDetails],
  );

  useEffect(() => {
    handleSkillUpdate("");
    if (data) {
      Object.entries(defaultValues).forEach(([key, value]) => {
        form.setValue(key as keyof CandidateFormData, value);
      });

      if (data?.skills) handleSkillUpdate(data?.skills);
    }
  }, [data, form, defaultValues]);

  useEffect(() => {
    GetCandidateDetails(location.pathname.split("/")[2]);
  }, []);

  return (
    <>
      <div className="flex flex-row w-full">
        {isLoading && <LoaderMask />}

        <CandidateDetailsLeftCol
          form={form}
          isLoading={isLoading}
          data={data}
          requiredSkills={requiredSkills}
          requiredSkillsArray={requiredSkillsArray}
          handleRequiredSkillsChange={handleRequiredSkillsChange}
          handleSkillSubmit={handleSkillSubmit}
          handleClearSkill={handleClearSkill}
          onSubmit={onSubmit}
        />

        <CandidateDetailsRightCol
          data={data}
          setModalType={setModalType}
          setSelectedExperience={setSelectedExperience}
          setSelectedEducation={setSelectedEducation}
          setOpenModal={setOpenModal}
        />
      </div>

      <ModalComp
        dialogTitle={
          modalType == "experience"
            ? selectedExperience
              ? "Edit Experience"
              : "Add Experience"
            : modalType == "education"
              ? selectedEducation
                ? "Edit Education"
                : "Add Education"
              : ""
        }
        dialogContentClassName="bg-white h-[700px] w-[800px] max-w-screen-lg"
        dialogContent={
          modalType === "experience" ? (
            <ExperienceModalContent
              onSave={handleSaveExperience}
              onCancel={() => {
                onModalClose();
              }}
              onDelete={selectedExperience ? handleDeleteExperience : undefined}
              initialData={selectedExperience}
              mode={selectedExperience ? "edit" : "add"}
            />
          ) : modalType === "education" ? (
            <EducationModalContent
              onSave={handleSaveEducation}
              onCancel={() => {
                onModalClose();
              }}
              onDelete={selectedEducation ? handleDeleteEducation : undefined}
              initialData={selectedEducation}
              mode={selectedEducation ? "edit" : "add"}
            />
          ) : null
        }
      />
    </>
  );
};

export default memo(CandidateDetailsForm);
