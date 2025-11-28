export class AnalyzeUrlDto {
  url!: string;
}

export class AnalyzeResponseDto {
  text!: string;
  source!: 'image' | 'url';
  verification?: string;
}

export class VerifyClaimDto {
  query!: string;
}

export class VerifyResponseDto {
  result!: string;
}
