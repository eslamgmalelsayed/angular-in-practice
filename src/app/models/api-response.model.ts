interface ApiResponse<T> {
  ok: boolean;
  data: T[];
  error_code: number;
}

export type { ApiResponse };
