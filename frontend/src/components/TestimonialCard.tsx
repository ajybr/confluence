const stringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = `hsl(${hash % 360}, 70%, 40%)`;
  return color;
};

export const TestimonialCard = ({
  name,
  company,
  comment,
}: {
  name: string;
  company: string;
  comment: string;
}) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="border border-[#3f3f3f] p-6 rounded-2xl text-white shadow-md">
      <div className="flex items-center gap-4 mb-4">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white"
          style={{ backgroundColor: stringToColor(name) }}
        >
          {initials}
        </div>
        <div>
          <div className="font-semibold">{name}</div>
          <div className="text-zinc-400 text-sm">{company}</div>
        </div>
      </div>
      <p className="text-zinc-300 tracking-wide text-semibold text-sm/relaxed lg:text-base/relaxed">
        {comment}
      </p>
    </div>
  );
};
