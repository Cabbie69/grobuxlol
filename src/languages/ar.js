const { done, error , style } = require('../config').emojis;

module.exports = {
  endbuy: {
    success: '**تم أنهاء عملية الشراء بنجاح!**',
    error: '**لايوجد عملية شراء للألغاء!**'
  },
  public: {
    cooldowns: `${style}**🤗 - الرجاء الإنتظار {timeLeft} من الثواني !**`,
    by: `طلب بواسطة {tag}`,
    nouser: `${style}**${error} | لايمكنني العثور على هذا المستخدم !**`,
    bot: `${style}**${error} | الرجاء تحديد مستخدم وليس روبوت !**`
  },
  redeemcode: {
    robux_added: '**تم أستخدام الكود بنجاح, تم أضافة {amount} روبكس لرصيدك, رصيدك الحالي هو {balance}**',
    entercode: '**الرجاء قم بتحديد الكود!**',
    codeexp: "**هذا الكود غير صالح او منتهي الصلاحية.**",
    already: '**لقد استخدمت هذا الكود بلفعل !**'
  },
  help: {
    helps: {
      description: `يساعد على معرفة كيفية إستخدام الأوامر.`,
      types: [`**الإختصارات:**`, `**الإستخدام:**`, `**أمثلة للأمر:**`]
    },
    types: [`**عامة:**`, `**إدارية:**`, `**روبوكس:**`],
    invalid: `${style}**${error} | لايمكنني العثور على هذا الأمر !**`,
    more: `للمزيد من التفاصيل حول أمر معين قم بكتابة:\n{prefix}help (command)`,
    list: `**قائمة الأوامر**`,
    title: `**الأمر: {command}**`
  },
  ping: {
    helps: {
      description: `لإختبار وقت إستجابة الروبوت.`,
    },
  },
  
      remove: {
    helps: {
      description: `لسحب عدد من الرصيد لشخص معين`
    },
    
    noamount: `${style}**${error} | الرجاء تحديد عدد الروبوكس بعد المستخدم !**`,
    invalid: `${style}**${error} | الرجاء إدخال عدد روبوكس صالح !**`,
    done: `${style}**${done} | تم خصم الروبوكس بنجاح, رصيد حساب {user} الحالي هو: \`{robux}\` !**`
  },
  
  tax: {
    quantity: 'كمية',
    robux: 'روبكس',
    value: 'قيمة',
    price: 'سعر',
    withtax: 'مع الضريبة'
  },
  setprefix: {
    helps: {
      description: `لتعيين بادئتك المفضلة على الروبوت.`,
    },
    done: `${style}**${done} | تم تغيير البادئة بنجاح !**`,
    reset: `${style}**${done} | تم إعادة تعيين البادئة بنجاح !**`
  },
  setlanguage: {
    helps: {
      description: `لتعيين لغتك المفضلة على الروبوت.`,
    },
    invalid: `${style}**${error} | هذه اللغة غير مدعومة حالياً !**\n${style}اللغات المدعومة:\n{languages}`,
    done: `${style}**${done} | تم تغيير اللغة بنجاح !**`
  },
  profile: {
    helps: {
      description: `لإظهار ملفات تعريف المستخدمين.`,
    }
  },
  title: {
    helps: {
      description: `لتعيين عنوانك المفضل لملف تعريفك.`
    }
  },
  rep: {
    helps: {
      description: `منح شخص نقطة إعجاب. يمكن إستخدامة مرة واحدة فقط كل 24 ساعة.`
    },
    yourself: `${style}**${error} | لايمكنك منح نفسك نقطة إعجاب !**`,
    invalid: `${style}**${error} | لايمكنك فعل ذلك. حاول مجدداً بعد {time} !**`,
    done: `${style}**${done} | تم منح {user} نقطة إعجاب !**`
  },
  buy: {
    helps: {
      description: `لشحن رصيد الروبوكس.`,
    },
    nan: `${style}**${error} | الرجاء إدخال قيمة صالحة !**`,
    limit: `${style}**${error} | الحد الأدنئ لشراء الروبوكس هو: \`{limit}\`**`,
    already: `${style}**${error} | لديك عملية شراء سابقة عليك إنهائها أولاً !**`,
    transfer: `**قم بتحويل {price} إلى {owner}**\n\`\`\`\n#credits {id} {price}\n\`\`\`\n**لديك دقيقتان فقط للتحويل !**`,
    twillclose: 'سيتم قفل التكت بعد 10 ثواني',
    done: `${style}${done} | **تمت العملية بنجاح !, رصيد حسابك الحالي {amount}R**`,
    timeout: `${style}**${error} | لقد إنتهئ الوقت المسموح لك به بالتحويل !**`,
    rsedrsala: '**تم تحويل {amount}R الى حسابك**\n`-balance` -**لمعرفة رصيد الروبكس لحسابك:**\n`-transfer` - **لتحويل الروبوكس الي حسابك**'
  },
  setcookies: {
    helps: {
      description: `لتحديد الكوكيز الخاص بحساب روبلوكس.`,
    },
    already: `${style}**${error} | هذا الكوكيز محدد مسبقاً !**`,
    done: `${style}**${done} | تم تحديد الكوكيز بنجاح !**`,
    invalid: `${style}**${error} | الرجاء تحديد كوكيز صالح للإستخدام !**`
  },
  setgroup: {
    helps: {
      description: `لتحديد الجروب الخاص بحساب روبلوكس.`,
    },
    nocookies: `${style}**${error} | الرجاء تحديد الكوكيز أولاً !**`,
    already: `${style}**${error}** | هذا الجروب محدد مسبقاً !**`,
    noowner: `${style}**${error} | الرجاء تحديد جروب مملوك لدى حساب الروبلوكس !**`,
    done: `${style}**${done} | تم تحديد الجروب بنجاح !**`,
    invalid: `${style}**${error} | الرجاء تحديد معرف جروب صالح للإستخدام !**`
  },
  stock: {
    helps: {
      description: `لعرض مخزون الروبوكس الذي في الجروب.`
    },
    nocookies: `${style}**${error} | الرجاء تحديد الكوكيز أولاً !**`,
    nogroup: `${style}**${error} | الرجاء تحديد الجروب أولاً !**`,
    done: `**مخزونك من الروبوكس في الجروب: \`{funds}\`**`
  },
  setowner: {
    helps: {
      description: `لتحديد مستلم أرباح الروبوكس.`
    },
    already: `${style}**${error} | هذا المستخدم محدد مسبقاً !**`,
    done: `${style}**${done} | تم نقل ملكية الارباح إلى {user} بنجاح !**`
  },
  setprice: {
    helps: {
      description: `لتحديد سعر الروبوكس الواحد.`
    },
    invalid: `${style}**${error} | الرجاء تحديد قيمة صالحة للسعر !**`,
    already: `${style}**${error} | هذا السعر محدد مسبقاً !**`,
    done: `${style}**${done} | تم تحديد سعر الروبوكس بنجاح !**`
  },
  setdiscount: {
    helps: {
      description: `لتحديد قيمة التخفيض بالنسبة المئوية.`
    },
    invalid: `${style}**${error} | الرجاء إدخال نسبة صالحة للتخفيض !**`,
    already: `${style}**${error} | هذه النسبة محددة مسبقاً !**`,
    done: `${style}**${done} | تم تحديد قيمة التخفيض بنجاح !**`
  },
  setlimit: {
    helps: {
      description: `لتحديد الحد الأدنئ لشراء الروبوكس.`
    },
    invalid: `${style}**${error} | الرجاء إدخال قيمة صالحة للحد الإدنى !**`,
    already: `${style}**${error} | هذا الحد محدد مسبقاً !**`,
    done: `${style}**${done} | تم تحديد الحد الأدنئ للشراء بنجاح !**`
  },
  setproofschannel: {
    helps: {
      description: `لتحديد قناة إثباتات التحويل.`
    },
    invalid: `${style}**${error} | الرجاء تحديد قناة صالحة !**`,
    already: `${style}**${error} | هذه القناة محددة مسبقاً !**`,
    done: `${style}**${done} | تم تحديد قناة إثباتات التحويل بنجاح !**`
  },
  setthankschannel: {
    helps: {
      description: `لتحديد قناة الشكر.`
    },
    invalid: `${style}**${error} | الرجاء تحديد قناة صالحة !**`,
    already: `${style}**${error} | هذه القناة محددة مسبقاً !**`,
    done: `${style}**${done} | تم تحديد قناة الشكر بنجاح !**`
  },
  setboostschannel: {
    helps: {
      description: `لتحديد قناة البوستات.`
    },
    invalid: `${style}**${error} | الرجاء تحديد قناة صالحة !**`,
    already: `${style}**${error} | هذه القناة محددة مسبقاً !**`,
    done: `${style}**${done} | تم تحديد قناة البوستات بنجاح !**`
  },
  setclientsrole: {
    helps: {
      description: `لتحديد رتبة العملاء.`
    },
    invalid: `${style}**${error} | الرجاء تحديد رتبة صالحة !**`,
    already: `${style}**${error} | هذه الرتبة محددة مسبقاً !**`,
    done: `${style}**${done} | تم تحديد رتبة العملاء بنجاح !**`
  },
  setboostsrole: {
    helps: {
      description: `لتحديد رتبة داعمين البوستات`
    },
    invalid: `${style}**${error} | الرجاء تحديد رتبة صالحة !**`,
    already: `${style}**${error} | هذه الرتبة محددة مسبقاً !**`,
    done: `${style}**${done} | تم تحديد رتبة داعمين البوستات بنجاح !**`
  },
  give: {
    helps: {
      description: `لمنح شخص عدد روبوكس معين.`
    },
    noamount: `${style}**${error} | الرجاء تحديد عدد الروبوكس بعد المستخدم !**`,
    invalid: `${style}**${error} | الرجاء إدخال عدد روبوكس صالح !**`,
    done: `${style}**${done} | تم تحويل الروبوكس بنجاح, رصيد حساب {user} الحالي هو: \`{robux}\` !**`
  },
  balance: {
    helps: {
      description: `لمعرفة رصيد الروبوكس الخاص بك.`
    },
    done: `**رصيدك من الروبوكس هو: \`{coins}\` !**`,
    noserver: `${style}**${error} | قم بتحديد خادم سحب الروبوكس اولاً !**`
  },
  transfer: {
    helps: {
      description: `لتحويل رصيدك من الروبوكس إلى رصيد فعلي داخل روبلوكس.`
    },
    notfound: `${style}**${error} | لايمكنني العثور على هذا الحساب في روبلوكس !**`,
    lock: `${style}**${error} | عذراً فالتحويل مقفل حالياً !**`,
    notingroup: `${style}**${error} | عذراً لايمكنني تحويل الروبوكس إلى حسابك يبدو أنك لست متواجد في الجروب !**\n${style}**رابط الجروب: {link}**`,
    noweeks: `${style}**${error} | عذراً لايمكنني تحويل الروبوكس إلى حسابك يجب أن تتواجد في الجروب منذ اكثر من أسبوعين !**`,
    done: `${style}**${done} | تم تحويل رصيدك بنجاح, رصيدك الحالي هو: \`{robux}\` !**\n ** لا تنس كتابة كلمة شكر <#880644890692812851>**`,
    thanksMessage: `${style}**من فضلك قم بكتابة كلمة شكر هنا: {channel}**`,
    proofsMessage: `${style}**تم الشراء بواسطة: {user} !**`,
    noserver: `${style}**${error} | قم بتحديد خادم سحب الروبوكس اولاً !**`,
    notenough: `${style}**${error} | رصيدك غير كافي لإتمام هذه العملية !**`,
    nohave: `${style}**${error} | عذراً فهذه الكمية من الروبوكس غير متوفرة حالياً !**`
  },
  setserver: {
    helps: {
      description: `لتحديد خادم سحب الروبوكس.`
    },
    done: `${style}**${done} | تم بنجاح تحديد الخادم !**`,
    invalid: `${style}**${error} | لايمكنني العثور على هذا الخادم !**`
  }
}