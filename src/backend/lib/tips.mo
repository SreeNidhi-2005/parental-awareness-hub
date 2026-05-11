import CommonTypes "../types/common";

module {
  let pool : [Text] = [
    "Today, put your phone down for 15 minutes and give your child your undivided attention. That time is priceless to them.",
    "Ask your child one open question today: 'What made you smile today?' Then just listen.",
    "Remember: children need love most when they deserve it least. Behavior is communication.",
    "Say 'I love you' and 'I'm proud of you' separately. Love should not be conditional on achievement.",
    "Repair matters more than perfection. Apologizing to your child when you're wrong builds their trust and models accountability.",
    "Try to understand the feeling behind the behavior before correcting it. Every behavior has a reason.",
    "Routine is security. Even simple rituals - a goodnight hug, a morning greeting - anchor children emotionally.",
    "Let your child fail sometimes. The gift of resilience comes from navigating difficulty with your support nearby.",
    "Your child notices more than you think. When you are calm under pressure, you teach them that feelings can be managed.",
    "Play with your child today - on their terms, in their world. Nothing communicates 'you matter' more powerfully.",
    "Instead of asking 'How was school?', try 'What is one thing that happened today?' - it opens more meaningful conversations.",
    "Validate before advising. Saying 'that sounds really hard' before offering solutions changes how your child experiences your support.",
    "When your teenager pulls away, remember: they are practicing independence, not rejection. Stay warm and available.",
    "Notice what is going well and name it specifically: 'I noticed how patient you were with your sibling just now.'",
    "If today was hard, that is okay. Good enough parenting - not perfect parenting - is what children actually need."
  ];

  public func getDailyTip(now : CommonTypes.Timestamp) : Text {
    let DAY : Int = 86_400_000_000_000;
    let dayIndex = (now / DAY).toNat() % pool.size();
    pool[dayIndex];
  };
};
