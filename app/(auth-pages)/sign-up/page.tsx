"use client";

import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";
import { useState, ChangeEvent } from "react";

export default function Signup(props: {
  searchParams: Message;
}) {
  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  
  const [errors, setErrors] = useState<{
    nickname?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // 실시간 유효성 검사
    validateField(name, value);
  };
  
  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case "nickname":
        if (!value) {
          newErrors.nickname = "닉네임을 입력해주세요";
        } else {
          delete newErrors.nickname;
        }
        break;
        
      case "email":
        if (!value) {
          newErrors.email = "이메일을 입력해주세요";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = "올바른 이메일 형식이 아닙니다";
        } else {
          delete newErrors.email;
        }
        break;
        
      case "password":
        if (!value) {
          newErrors.password = "비밀번호를 입력해주세요";
        } else if (value.length < 6) {
          newErrors.password = "비밀번호는 최소 6자 이상이어야 합니다";
        } else {
          delete newErrors.password;
        }
        
        // 비밀번호가 변경되면 비밀번호 확인도 재검사
        if (formData.confirmPassword) {
          if (value !== formData.confirmPassword) {
            newErrors.confirmPassword = "비밀번호가 일치하지 않습니다";
          } else {
            delete newErrors.confirmPassword;
          }
        }
        break;
        
      case "confirmPassword":
        if (!value) {
          newErrors.confirmPassword = "비밀번호 확인을 입력해주세요";
        } else if (value !== formData.password) {
          newErrors.confirmPassword = "비밀번호가 일치하지 않습니다";
        } else {
          delete newErrors.confirmPassword;
        }
        break;
    }
    
    setErrors(newErrors);
  };

  const validateForm = (formData: FormData) => {
    const newErrors: typeof errors = {};
    const nickname = formData.get("nickname")?.toString();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const confirmPassword = formData.get("confirmPassword")?.toString();

    if (!nickname) {
      newErrors.nickname = "닉네임을 입력해주세요";
    }

    if (!email) {
      newErrors.email = "이메일을 입력해주세요";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다";
    }

    if (!password) {
      newErrors.password = "비밀번호를 입력해주세요";
    } else if (password.length < 6) {
      newErrors.password = "비밀번호는 최소 6자 이상이어야 합니다";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "비밀번호 확인을 입력해주세요";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (formData: FormData) => {
    if (!validateForm(formData)) {
      return;
    }
    return signUpAction(formData);
  };

  return (
    <>
      <form className="flex flex-col min-w-64 max-w-64 mx-auto">
        <h1 className="text-2xl font-medium">회원가입</h1>
        <p className="text-sm text text-foreground">
          이미 계정이 있으신가요?{" "}
          <Link className="text-primary font-medium underline" href="/sign-in">
            로그인
          </Link>
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="nickname">닉네임</Label>
          <Input 
            name="nickname" 
            placeholder="닉네임을 입력해주세요" 
            required 
            className={errors.nickname ? "border-destructive" : ""}
            value={formData.nickname}
            onChange={handleChange}
          />
          {errors.nickname && (
            <p className="text-sm text-destructive -mt-2">{errors.nickname}</p>
          )}
          
          <Label htmlFor="email">이메일</Label>
          <Input 
            name="email" 
            placeholder="이메일을 입력해주세요" 
            required 
            className={errors.email ? "border-destructive" : ""}
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-sm text-destructive -mt-2">{errors.email}</p>
          )}
          
          <Label htmlFor="password">비밀번호</Label>
          <Input
            type="password"
            name="password"
            placeholder="비밀번호를 입력해주세요"
            minLength={6}
            required
            className={errors.password ? "border-destructive" : ""}
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="text-sm text-destructive -mt-2">{errors.password}</p>
          )}
          
          <Label htmlFor="confirmPassword">비밀번호 확인</Label>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="비밀번호를 다시 입력해주세요"
            minLength={6}
            required
            className={errors.confirmPassword ? "border-destructive" : ""}
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-destructive -mt-2">{errors.confirmPassword}</p>
          )}
          
          <SubmitButton formAction={handleSubmit} pendingText="회원가입 중...">
            회원가입
          </SubmitButton>
          <FormMessage message={props.searchParams} />
        </div>
      </form>
      <SmtpMessage />
    </>
  );
}
