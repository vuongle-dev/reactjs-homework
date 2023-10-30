import React from "react";
type IconProps = {
  width?: number;
  height?: number;
  color?: string;
  colorarray?: string[];
  className?: string;
};

function CheckedIcon({
  width = 16,
  height = 16,
  color = "#27AE60",
  className,
}: IconProps) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.90474 5.75219L6.90174 8.76219L5.74674 7.60719C5.57567 7.40742 5.30706 7.32041 5.05135 7.38192C4.79564 7.44343 4.59598 7.64308 4.53447 7.89879C4.47296 8.15451 4.55998 8.42312 4.75974 8.59419L6.40474 10.2462C6.53684 10.3772 6.71568 10.4503 6.90174 10.4492C7.08538 10.4484 7.26136 10.3755 7.39174 10.2462L10.8917 6.74619C11.0243 6.61475 11.0988 6.43583 11.0988 6.24919C11.0988 6.06254 11.0243 5.88362 10.8917 5.75219C10.6187 5.48078 10.1778 5.48078 9.90474 5.75219ZM8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C11.866 15 15 11.866 15 8C15 6.14348 14.2625 4.36301 12.9497 3.05025C11.637 1.7375 9.85651 1 8 1ZM8.00068 13.6007C4.90789 13.6007 2.40068 11.0935 2.40068 8.00068C2.40068 4.90789 4.90789 2.40068 8.00068 2.40068C11.0935 2.40068 13.6007 4.90789 13.6007 8.00068C13.6007 9.4859 13.0107 10.9103 11.9605 11.9605C10.9103 13.0107 9.4859 13.6007 8.00068 13.6007Z"
        fill={color}
      />
    </svg>
  );
}
function EyeIcon({
  width = 16,
  height = 16,
  color = "#111A2C",
  className,
}: IconProps) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.0002 8C15.0832 4.54955 11.8491 2 8.00012 2C4.15111 2 0.916987 4.54955 0 8C0.916987 11.4505 4.15111 14 8.00012 14C11.8491 14 15.0832 11.4505 16.0002 8ZM1.43104 8C2.30807 10.7054 4.9191 12.6667 7.99992 12.6667C11.0807 12.6667 13.6918 10.7054 14.5687 8C13.6918 5.29457 11.0807 3.33333 7.99992 3.33333C4.9191 3.33333 2.30807 5.29457 1.43104 8ZM7.99993 10.6667C9.47267 10.6667 10.6666 9.47273 10.6666 8C10.6666 6.52724 9.47267 5.33333 7.99993 5.33333C6.52716 5.33333 5.33325 6.52724 5.33325 8C5.33325 9.47273 6.52716 10.6667 7.99993 10.6667ZM7.99993 9.33333C8.73627 9.33333 9.33327 8.7364 9.33327 8C9.33327 7.2636 8.73627 6.66667 7.99993 6.66667C7.26353 6.66667 6.66659 7.2636 6.66659 8C6.66659 8.7364 7.26353 9.33333 7.99993 9.33333Z"
        fill={color}
      />
    </svg>
  );
}
function FacebookIcon({
  width = 16,
  height = 16,
  color = "white",
  className,
}: IconProps) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_230_8)">
        <path
          d="M14.2857 0H1.71429C1.25963 0 0.823594 0.180612 0.502103 0.502103C0.180612 0.823594 0 1.25963 0 1.71429L0 14.2857C0 14.7404 0.180612 15.1764 0.502103 15.4979C0.823594 15.8194 1.25963 16 1.71429 16H6.61607V10.5604H4.36607V8H6.61607V6.04857C6.61607 3.82893 7.9375 2.60286 9.96143 2.60286C10.9307 2.60286 11.9443 2.77571 11.9443 2.77571V4.95429H10.8275C9.72714 4.95429 9.38393 5.63714 9.38393 6.3375V8H11.8404L11.4475 10.5604H9.38393V16H14.2857C14.7404 16 15.1764 15.8194 15.4979 15.4979C15.8194 15.1764 16 14.7404 16 14.2857V1.71429C16 1.25963 15.8194 0.823594 15.4979 0.502103C15.1764 0.180612 14.7404 0 14.2857 0Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_230_8">
          <rect width={width} height={height} fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
}

function GoogleColorfulIcon({
  width = 16,
  height = 16,
  color = "white",
  className,
}: IconProps) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_230_13)">
        <path
          d="M15.8444 6.4332H15.2V6.4H8V9.6H12.5212C11.8616 11.4628 10.0892 12.8 8 12.8C5.3492 12.8 3.2 10.6508 3.2 8C3.2 5.3492 5.3492 3.2 8 3.2C9.2236 3.2 10.3368 3.6616 11.1844 4.4156L13.4472 2.1528C12.0184 0.8212 10.1072 0 8 0C3.582 0 0 3.582 0 8C0 12.418 3.582 16 8 16C12.418 16 16 12.418 16 8C16 7.4636 15.9448 6.94 15.8444 6.4332Z"
          fill="#FFC107"
        />
        <path
          d="M0.921082 4.2764L3.54948 6.204C4.26068 4.4432 5.98308 3.2 7.99868 3.2C9.22228 3.2 10.3355 3.6616 11.1831 4.4156L13.4459 2.1528C12.0171 0.8212 10.1059 0 7.99868 0C4.92588 0 2.26108 1.7348 0.921082 4.2764Z"
          fill="#FF3D00"
        />
        <path
          d="M7.99856 15.9995C10.065 15.9995 11.9426 15.2087 13.3622 13.9227L10.8862 11.8275C10.056 12.4588 9.04154 12.8003 7.99856 12.7995C5.91776 12.7995 4.15096 11.4727 3.48536 9.62109L0.876556 11.6311C2.20056 14.2219 4.88936 15.9995 7.99856 15.9995Z"
          fill="#4CAF50"
        />
        <path
          d="M15.8436 6.43164H15.1992V6.39844H7.99921V9.59844H12.5204C12.2049 10.485 11.6365 11.2597 10.8856 11.8268L10.8868 11.826L13.3628 13.9212C13.1876 14.0804 15.9992 11.9984 15.9992 7.99844C15.9992 7.46204 15.944 6.93844 15.8436 6.43164Z"
          fill="#1976D2"
        />
      </g>
      <defs>
        <clipPath id="clip0_230_13">
          <rect width={width} height={height} fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
}

function MastercardColorfulIcon({
  width = 26,
  height = 16,
  className,
}: IconProps) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16.5156 14.291H9.4834V1.71191H16.5156V14.291Z" fill="#FF5F00" />
      <path
        d="M9.93394 8C9.93394 5.44828 11.1343 3.17528 13.0036 1.71047C11.6366 0.639329 9.91146 9.53674e-07 8.03658 9.53674e-07C3.59799 9.53674e-07 0 3.58167 0 8C0 12.4183 3.59799 16 8.03658 16C9.91146 16 11.6366 15.3607 13.0036 14.2895C11.1343 12.8247 9.93394 10.5517 9.93394 8Z"
        fill="#EB001B"
      />
      <path
        d="M26 8C26 12.4183 22.402 16 17.9635 16C16.0886 16 14.3634 15.3607 12.996 14.2895C14.8657 12.8247 16.0661 10.5517 16.0661 8C16.0661 5.44828 14.8657 3.17528 12.996 1.71047C14.3634 0.639329 16.0886 9.53674e-07 17.9635 9.53674e-07C22.402 9.53674e-07 26 3.58167 26 8Z"
        fill="#F79E1B"
      />
    </svg>
  );
}

function AppleColorfulIcon({ width = 17, height = 20, className }: IconProps) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.5615 3.20503C10.8199 4.04473 9.63335 4.70702 8.4468 4.61241C8.29848 3.47705 8.87939 2.27072 9.55919 1.52564C10.3008 0.662295 11.5986 0.0473067 12.6492 0C12.7728 1.18267 12.2907 2.34168 11.5615 3.20503Z"
        fill="#111A2C"
      />
      <path
        d="M12.6369 4.83687C10.9189 4.74226 9.44809 5.77118 8.63233 5.77118C7.80422 5.77118 6.55587 4.88418 5.19628 4.90783C3.42881 4.93149 1.78494 5.88945 0.882665 7.41509C-0.971323 10.4664 0.400628 14.9842 2.19282 17.4678C3.07037 18.6977 4.12096 20.046 5.50527 19.9987C6.81543 19.9514 7.33454 19.1826 8.91661 19.1826C10.511 19.1826 10.9684 19.9987 12.3527 19.975C13.7864 19.9514 14.6887 18.7451 15.5663 17.5151C16.5674 16.1195 16.9753 14.7595 17 14.6885C16.9753 14.6648 14.2314 13.6596 14.2067 10.6319C14.1819 8.10104 16.3696 6.89472 16.4685 6.82376C15.2325 5.07341 13.3044 4.88418 12.6369 4.83687Z"
        fill="#111A2C"
      />
    </svg>
  );
}

function VisaColorfulIcon({ width = 30, height = 9, className }: IconProps) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.46485 6.10237L8.81503 0V0.0009857H11.3531L7.58157 8.97292H5.04354L2.89148 1.25194C4.4119 2.00146 5.77429 3.51037 6.20884 4.89893L6.46485 6.10237ZM12.3198 0L10.819 8.98189H13.2178L14.7176 0H12.3198ZM19.5555 3.65968C18.7172 3.26156 18.2034 2.99286 18.2034 2.58567C18.2136 2.21544 18.6379 1.83614 19.5854 1.83614C20.3647 1.81731 20.9376 1.99346 21.3721 2.16872L21.5898 2.26216L21.9159 0.382924C21.4421 0.206779 20.6909 0.0126953 19.7629 0.0126953C17.3941 0.0126953 15.7261 1.19721 15.7157 2.89133C15.6962 4.14149 16.9099 4.83523 17.8183 5.25139C18.7462 5.6783 19.0621 5.95508 19.0621 6.33438C19.0519 6.91673 18.3118 7.18543 17.6212 7.18543C16.6644 7.18543 16.1504 7.04704 15.3702 6.72255L15.0543 6.58415L14.7188 8.53712C15.2823 8.77802 16.3186 8.99005 17.3942 9.00089C19.9116 9.00089 21.5497 7.83432 21.5703 6.02881C21.5785 5.03838 20.9385 4.27979 19.5555 3.65968ZM26.2096 0.0281466H28.0655L29.9998 8.98944H27.7794L27.4197 7.2001H24.6032L23.9099 8.98224H21.3925L24.9556 0.750763C25.2032 0.186351 25.6377 0.0281466 26.2096 0.0281466ZM25.3019 5.40153C25.3531 5.397 26.2679 2.49233 26.2679 2.49233L26.9986 5.40153H25.3019Z"
        fill="#28338A"
      />
      <path
        d="M5.33262 1.20947C5.14906 0.493313 4.56368 0.0103074 3.76866 0H0.0384159L0 0.173783C2.90985 0.893653 5.35224 3.10872 6.14459 5.19226L5.33262 1.20947Z"
        fill="#F99900"
      />
    </svg>
  );
}
function PaypalColorfulIcon({ width = 17, height = 20, className }: IconProps) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4.82871 19.3217L5.17631 17.1202L4.40199 17.1022H0.704468L3.27411 0.856368C3.28212 0.807173 3.308 0.761506 3.34579 0.729019C3.38377 0.696532 3.43218 0.678711 3.48282 0.678711H9.7174C11.7873 0.678711 13.2157 1.10809 13.9614 1.95572C14.311 2.35336 14.5337 2.76901 14.6415 3.22624C14.7545 3.70612 14.7563 4.27937 14.6461 4.97867L14.6381 5.02954V5.47767L14.9878 5.67519C15.2821 5.83094 15.5161 6.00916 15.6956 6.21317C15.9946 6.55327 16.1881 6.98543 16.2698 7.49761C16.3543 8.02446 16.3264 8.65155 16.1881 9.36143C16.0285 10.1779 15.7706 10.8891 15.4223 11.4708C15.1021 12.007 14.694 12.4518 14.2094 12.7963C13.7467 13.1238 13.1971 13.3724 12.5756 13.5314C11.9733 13.6878 11.2867 13.7667 10.5336 13.7667H10.0484C9.70158 13.7667 9.36459 13.8912 9.10003 14.1145C8.83473 14.3425 8.65935 14.654 8.60554 14.9947L8.56886 15.1929L7.95466 19.0733L7.92692 19.2157C7.91947 19.2608 7.90681 19.2833 7.88819 19.2985C7.87162 19.3124 7.84779 19.3217 7.82452 19.3217H4.82871Z"
        fill="#28356A"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15.3195 5.08203C15.3011 5.20065 15.2797 5.32188 15.2558 5.44644C14.4337 9.65563 11.6207 11.1097 8.02818 11.1097H6.19896C5.75958 11.1097 5.38927 11.4277 5.32094 11.8599L4.11916 19.4609C4.07466 19.7447 4.29398 20.0004 4.58107 20.0004H7.82543C8.20951 20.0004 8.53589 19.7221 8.59639 19.3443L8.62823 19.18L9.23909 15.3148L9.27837 15.1028C9.33813 14.7238 9.66525 14.4453 10.0493 14.4453H10.5345C13.6778 14.4453 16.1385 13.1729 16.8577 9.49059C17.158 7.95239 17.0026 6.66795 16.2076 5.76463C15.967 5.49229 15.6686 5.26619 15.3195 5.08203Z"
        fill="#298FC2"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.4594 4.73955C14.3337 4.70298 14.2042 4.66994 14.0712 4.64005C13.9375 4.6109 13.8007 4.5851 13.6598 4.56245C13.1666 4.483 12.6261 4.44531 12.0473 4.44531H7.16062C7.04017 4.44531 6.92585 4.47242 6.82364 4.52142C6.59818 4.62947 6.4308 4.84221 6.39021 5.10266L5.35059 11.668L5.3208 11.8594C5.38913 11.4272 5.75944 11.1092 6.19882 11.1092H8.02803C11.6205 11.1092 14.4335 9.65435 15.2557 5.44591C15.2803 5.32134 15.3009 5.20012 15.3194 5.0815C15.1114 4.97141 14.8861 4.87729 14.6435 4.7971C14.5836 4.77724 14.5218 4.75811 14.4594 4.73955Z"
        fill="#22284F"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.39017 5.10248C6.43076 4.84203 6.59814 4.62929 6.8236 4.52199C6.92656 4.47279 7.04013 4.44569 7.16058 4.44569H12.0472C12.6261 4.44569 13.1665 4.48356 13.6597 4.56301C13.8007 4.58547 13.9375 4.61146 14.0712 4.64061C14.2041 4.67031 14.3337 4.70354 14.4594 4.73993C14.5217 4.75849 14.5835 4.7778 14.6441 4.79692C14.8866 4.87711 15.1121 4.97198 15.3201 5.08132C15.5647 3.52585 15.318 2.46677 14.4746 1.50776C13.5447 0.451846 11.8664 0 9.71887 0H3.4841C3.04546 0 2.67124 0.318 2.60347 0.750911L0.00664589 17.1638C-0.0445534 17.4885 0.206602 17.7815 0.535023 17.7815H4.38409L6.39017 5.10248Z"
        fill="#28356A"
      />
    </svg>
  );
}

export {
  CheckedIcon,
  EyeIcon,
  FacebookIcon,
  GoogleColorfulIcon,
  MastercardColorfulIcon,
  AppleColorfulIcon,
  VisaColorfulIcon,
  PaypalColorfulIcon,
};
